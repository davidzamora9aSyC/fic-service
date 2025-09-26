import { Injectable } from '@nestjs/common';
import { Prisma, FicCategoria, FicLiquidez } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListFicFundsDto } from './dto/list-fic-funds.dto';

@Injectable()
export class FicFundsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(pagination: PaginationQueryDto, filters: ListFicFundsDto) {
    const where: Prisma.FicFondoWhereInput = {
      entidadId: filters.entidadId,
      categoria: filters.categoria as FicCategoria | undefined,
      liquidez: filters.liquidez as FicLiquidez | undefined,
      ...(filters.search
        ? {
            OR: [
              { nombre: { contains: filters.search, mode: 'insensitive' } },
              { codigo: { contains: filters.search, mode: 'insensitive' } },
              { entidad: { nombre: { contains: filters.search, mode: 'insensitive' } } },
            ],
          }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ficFondo.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { nombre: 'asc' },
        include: {
          entidad: true,
        },
      }),
      this.prisma.ficFondo.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: filters?.search ? pagination.page ?? 1 : pagination.page ?? 1,
        limit: pagination.take,
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.ficFondo.findUnique({
      where: { id },
      include: {
        entidad: true,
      },
    });
  }
}

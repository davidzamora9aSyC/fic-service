import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListFicAccountsDto } from './dto/list-fic-accounts.dto';
import { CreateFicAccountDto } from './dto/create-fic-account.dto';

@Injectable()
export class FicAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(pagination: PaginationQueryDto, filters: ListFicAccountsDto) {
    const where: Prisma.FicCuentaWhereInput = {
      usuarioId: filters.usuarioId,
      fondoId: filters.fondoId,
      estado: filters.estado,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ficCuenta.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { creadoEn: 'desc' },
        include: {
          fondo: {
            include: { entidad: true },
          },
        },
      }),
      this.prisma.ficCuenta.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: pagination.page ?? 1,
        limit: pagination.take,
      },
    };
  }

  async findOne(id: string) {
    const cuenta = await this.prisma.ficCuenta.findUnique({
      where: { id },
      include: {
        fondo: {
          include: { entidad: true },
        },
      },
    });

    if (!cuenta) {
      throw new NotFoundException(`Cuenta ${id} no encontrada`);
    }

    return cuenta;
  }

  async create(dto: CreateFicAccountDto) {
    return this.prisma.ficCuenta.create({
      data: {
        usuarioId: dto.usuarioId,
        fondoId: dto.fondoId,
        numeroCuentaExterna: dto.numeroCuentaExterna,
        fechaApertura: new Date(dto.fechaApertura),
        saldoCuotas: dto.saldoCuotas,
        saldoPesos: dto.saldoPesos,
        estado: dto.estado,
        ordenAperturaId: dto.ordenAperturaId,
      },
    });
  }
}

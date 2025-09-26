import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListFicTransactionsDto } from './dto/list-fic-transactions.dto';
import { CreateFicTransactionDto } from './dto/create-fic-transaction.dto';

@Injectable()
export class FicTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async listByAccount(accountId: string, pagination: PaginationQueryDto, filters: ListFicTransactionsDto) {
    const where: Prisma.FicTransaccionWhereInput = {
      cuentaId: accountId,
      tipo: filters.tipo,
      ...(filters.from || filters.to
        ? {
            fechaValor: {
              gte: filters.from ? new Date(filters.from) : undefined,
              lte: filters.to ? new Date(filters.to) : undefined,
            },
          }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ficTransaccion.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { fechaValor: 'desc' },
        include: {
          orden: true,
        },
      }),
      this.prisma.ficTransaccion.count({ where }),
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

  async create(dto: CreateFicTransactionDto) {
    return this.prisma.ficTransaccion.create({
      data: {
        cuentaId: dto.cuentaId,
        ordenId: dto.ordenId,
        tipo: dto.tipo,
        montoPesos: dto.montoPesos,
        montoCuotas: dto.montoCuotas,
        moneda: dto.moneda,
        fechaValor: new Date(dto.fechaValor),
        referenciaExterna: dto.referenciaExterna,
        documentoSoporteId: dto.documentoSoporteId,
        saldoPesosPosterior: dto.saldoPesosPosterior,
        saldoCuotasPosterior: dto.saldoCuotasPosterior,
        descripcion: dto.descripcion,
      },
    });
  }
}

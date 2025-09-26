import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FicOrdenEstado, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateFicOrderDto } from './dto/create-fic-order.dto';
import { UpdateFicOrderStatusDto } from './dto/update-fic-order-status.dto';
import { ListFicOrdersDto } from './dto/list-fic-orders.dto';

@Injectable()
export class FicOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFicOrderDto) {
    return this.prisma.ficOrden.create({
      data: {
        usuarioId: dto.usuarioId,
        fondoId: dto.fondoId,
        perfilRiesgoId: dto.perfilRiesgoId,
        tipo: dto.tipo,
        moneda: dto.moneda,
        monto: dto.monto,
        estado: FicOrdenEstado.BORRADOR,
        documentoFormularioId: dto.documentoFormularioId,
        nota: dto.nota,
      },
    });
  }

  async list(pagination: PaginationQueryDto, filters: ListFicOrdersDto) {
    const where: Prisma.FicOrdenWhereInput = {
      usuarioId: filters.usuarioId,
      fondoId: filters.fondoId,
      estado: filters.estado,
      tipo: filters.tipo,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ficOrden.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
        include: {
          fondo: {
            include: { entidad: true },
          },
          perfilRiesgo: true,
        },
      }),
      this.prisma.ficOrden.count({ where }),
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
    const order = await this.prisma.ficOrden.findUnique({
      where: { id },
      include: {
        fondo: {
          include: { entidad: true },
        },
        perfilRiesgo: true,
        transacciones: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Orden ${id} no encontrada`);
    }

    return order;
  }

  async updateEstado(id: string, dto: UpdateFicOrderStatusDto) {
    const order = await this.prisma.ficOrden.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Orden ${id} no encontrada`);
    }

    if (order.estado === FicOrdenEstado.CANCELADA || order.estado === FicOrdenEstado.RECHAZADA) {
      throw new BadRequestException('No es posible actualizar el estado de una orden cerrada.');
    }

    return this.prisma.ficOrden.update({
      where: { id },
      data: {
        estado: dto.estado,
        razonRechazo: dto.razonRechazo,
        cuentaDestino: dto.cuentaDestino,
        fechaDecision:
          dto.estado === FicOrdenEstado.APROBADA || dto.estado === FicOrdenEstado.RECHAZADA
            ? new Date()
            : order.fechaDecision,
      },
    });
  }
}

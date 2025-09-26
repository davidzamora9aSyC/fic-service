import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateRiskProfileDto } from './dto/create-risk-profile.dto';
import { ListRiskProfileDto } from './dto/list-risk-profile.dto';

@Injectable()
export class FicRiskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRiskProfileDto) {
    return this.prisma.perfilRiesgo.create({
      data: {
        usuarioId: dto.usuarioId,
        metodologia: dto.metodologia,
        fechaEvaluacion: new Date(dto.fechaEvaluacion),
        nivel: dto.nivel,
        objetivosInversion: dto.objetivosInversion,
        toleranciaPerdida: dto.toleranciaPerdida,
        observaciones: dto.observaciones,
      },
    });
  }

  async list(pagination: PaginationQueryDto, filters: ListRiskProfileDto) {
    const where = {
      usuarioId: filters.usuarioId,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.perfilRiesgo.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { fechaEvaluacion: 'desc' },
      }),
      this.prisma.perfilRiesgo.count({ where }),
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
    const perfil = await this.prisma.perfilRiesgo.findUnique({ where: { id } });
    if (!perfil) {
      throw new NotFoundException(`Perfil ${id} no encontrado`);
    }
    return perfil;
  }
}

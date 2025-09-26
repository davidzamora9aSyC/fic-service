import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FicOrdenEstado, FicOrdenTipo } from '@prisma/client';

export class ListFicOrdersDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsString()
  fondoId?: string;

  @IsOptional()
  @IsEnum(FicOrdenEstado)
  estado?: FicOrdenEstado;

  @IsOptional()
  @IsEnum(FicOrdenTipo)
  tipo?: FicOrdenTipo;
}

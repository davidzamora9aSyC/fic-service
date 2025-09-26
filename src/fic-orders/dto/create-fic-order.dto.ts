import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { FicOrdenTipo } from '@prisma/client';

export class CreateFicOrderDto {
  @IsString()
  usuarioId!: string;

  @IsString()
  fondoId!: string;

  @IsOptional()
  @IsString()
  perfilRiesgoId?: string;

  @IsEnum(FicOrdenTipo)
  tipo!: FicOrdenTipo;

  @IsString()
  moneda!: string;

  @Type(() => Number)
  @IsNumber()
  monto!: number;

  @IsOptional()
  @IsString()
  documentoFormularioId?: string;

  @IsOptional()
  @IsString()
  nota?: string;
}

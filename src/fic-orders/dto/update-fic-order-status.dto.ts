import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FicOrdenEstado } from '@prisma/client';

export class UpdateFicOrderStatusDto {
  @IsEnum(FicOrdenEstado)
  estado!: FicOrdenEstado;

  @IsOptional()
  @IsString()
  razonRechazo?: string;

  @IsOptional()
  @IsString()
  cuentaDestino?: string;
}

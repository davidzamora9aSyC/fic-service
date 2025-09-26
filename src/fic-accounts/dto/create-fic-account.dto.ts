import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { FicCuentaEstado } from '@prisma/client';

export class CreateFicAccountDto {
  @IsString()
  usuarioId!: string;

  @IsString()
  fondoId!: string;

  @IsOptional()
  @IsString()
  numeroCuentaExterna?: string;

  @IsDateString()
  fechaApertura!: string;

  @Type(() => Number)
  @IsNumber()
  saldoCuotas!: number;

  @Type(() => Number)
  @IsNumber()
  saldoPesos!: number;

  @IsEnum(FicCuentaEstado)
  estado!: FicCuentaEstado;

  @IsOptional()
  @IsString()
  ordenAperturaId?: string;
}

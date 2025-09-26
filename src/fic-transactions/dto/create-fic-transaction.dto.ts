import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { FicTransaccionTipo } from '@prisma/client';

export class CreateFicTransactionDto {
  @IsString()
  cuentaId!: string;

  @IsOptional()
  @IsString()
  ordenId?: string;

  @IsEnum(FicTransaccionTipo)
  tipo!: FicTransaccionTipo;

  @Type(() => Number)
  @IsNumber()
  montoPesos!: number;

  @Type(() => Number)
  @IsNumber()
  montoCuotas!: number;

  @IsString()
  moneda!: string;

  @IsDateString()
  fechaValor!: string;

  @IsOptional()
  @IsString()
  referenciaExterna?: string;

  @IsOptional()
  @IsString()
  documentoSoporteId?: string;

  @Type(() => Number)
  @IsNumber()
  saldoPesosPosterior!: number;

  @Type(() => Number)
  @IsNumber()
  saldoCuotasPosterior!: number;

  @IsOptional()
  @IsString()
  descripcion?: string;
}

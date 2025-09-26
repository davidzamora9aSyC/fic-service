import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FicTransaccionTipo } from '@prisma/client';

export class ListFicTransactionsDto {
  @IsOptional()
  @IsEnum(FicTransaccionTipo)
  tipo?: FicTransaccionTipo;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}

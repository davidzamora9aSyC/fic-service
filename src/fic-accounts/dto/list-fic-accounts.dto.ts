import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FicCuentaEstado } from '@prisma/client';

export class ListFicAccountsDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsString()
  fondoId?: string;

  @IsOptional()
  @IsEnum(FicCuentaEstado)
  estado?: FicCuentaEstado;
}

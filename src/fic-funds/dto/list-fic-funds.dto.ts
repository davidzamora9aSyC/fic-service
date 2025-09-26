import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FicCategoria, FicLiquidez } from '@prisma/client';

export class ListFicFundsDto {
  @IsOptional()
  @IsString()
  entidadId?: string;

  @IsOptional()
  @IsEnum(FicCategoria)
  categoria?: FicCategoria;

  @IsOptional()
  @IsEnum(FicLiquidez)
  liquidez?: FicLiquidez;

  @IsOptional()
  @IsString()
  search?: string;
}

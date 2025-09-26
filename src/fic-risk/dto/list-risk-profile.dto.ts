import { IsOptional, IsString } from 'class-validator';

export class ListRiskProfileDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;
}

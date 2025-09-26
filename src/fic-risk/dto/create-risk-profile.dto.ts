import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateRiskProfileDto {
  @IsString()
  usuarioId!: string;

  @IsString()
  metodologia!: string;

  @IsDateString()
  fechaEvaluacion!: string;

  @IsString()
  nivel!: string;

  @IsOptional()
  @IsString()
  objetivosInversion?: string;

  @IsOptional()
  @IsString()
  toleranciaPerdida?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

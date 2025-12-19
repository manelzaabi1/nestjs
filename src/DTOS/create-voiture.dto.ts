// src/DTOS/create-voiture.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateVoitureDto {
  @IsString()
  marque: string;

  @IsString()
  modele: string;

  @IsNumber()
  prix: number;
}

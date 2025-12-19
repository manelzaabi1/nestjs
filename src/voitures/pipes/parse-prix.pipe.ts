// src/voitures/pipes/parse-prix.pipe.ts
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class ParsePrixPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // si c'est le body complet
    const prix = Number(value.prix ?? value);

    if (Number.isNaN(prix)) {
      throw new BadRequestException('Le prix doit être un nombre');
    }
    if (prix < 0) {
      throw new BadRequestException('Le prix doit être positif');
    }

    if (typeof value === 'object') {
      return { ...value, prix };
    }
    return prix;
  }
}

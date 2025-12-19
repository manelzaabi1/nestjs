import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoitureDocument = Voiture & Document;

@Schema()
export class Voiture {
  @Prop({ required: true })
  marque: string;

  @Prop({ required: true })
  modele: string;

  @Prop({ required: true })
  prix: number;

  @Prop()
  dateCreation: Date;
}

export const VoitureSchema = SchemaFactory.createForClass(Voiture);



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Voiture, VoitureSchema } from './voiture.schema';
import { VoituresController } from './voitures.controller';
import { VoituresService } from './voitures.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Voiture.name, schema: VoitureSchema }]),
  ],
  controllers: [VoituresController],
  providers: [VoituresService],
})
export class VoituresModule {}

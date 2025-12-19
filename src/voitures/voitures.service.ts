import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voiture, VoitureDocument } from './voiture.schema';
import { CreateVoitureDto } from '../DTOS/create-voiture.dto';

@Injectable()
export class VoituresService {
  constructor(
    @InjectModel(Voiture.name) private voitureModel: Model<VoitureDocument>,
  ) {}

  create(dto: CreateVoitureDto) {
    const voiture = new this.voitureModel(dto);
    return voiture.save();
  }

  findAll() {
    return this.voitureModel.find().exec();
  }

  findOne(id: string) {
    return this.voitureModel.findById(id).exec();
  }

  update(id: string, dto: Partial<CreateVoitureDto>) {
    return this.voitureModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.voitureModel.findByIdAndDelete(id).exec();
  }

  // somme des prix par marque
  sommeParMarque() {
    return this.voitureModel
      .aggregate([
        {
          $group: {
            _id: '$marque',
            totalPrix: { $sum: '$prix' },
            count: { $sum: 1 },
          },
        },
      ])
      .exec();
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { VoituresService } from './voitures.service';
import { CreateVoitureDto } from '../DTOS/create-voiture.dto';
import { ParsePrixPipe } from './pipes/parse-prix.pipe';
import { PrixDtInterceptor } from './interceptors/prix-dt.interceptor';

@Controller('voitures')
@UseInterceptors(PrixDtInterceptor)
export class VoituresController {
  constructor(private readonly voituresService: VoituresService) {}

  @Post()
  create(@Body(ParsePrixPipe) dto: CreateVoitureDto) {
    return this.voituresService.create(dto);
  }

  @Get()
  findAll() {
    return this.voituresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voituresService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ParsePrixPipe) dto: Partial<CreateVoitureDto>,
  ) {
    return this.voituresService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voituresService.remove(id);
  }

  @Get('stats/somme-par-marque')
  getSommeParMarque() {
    return this.voituresService.sommeParMarque();
  }
}

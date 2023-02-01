import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';
import { CampusService } from './campus.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() campusData: CreateCampusDto) {
    return this.campusService.create(campusData);
  }

  @Get()
  findAll() {
    return this.campusService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampusDto: UpdateCampusDto) {
    return this.campusService.update(+id, updateCampusDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campusService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';
import { queryBoolPipe } from 'src/utils/pipes/queryBool.pipe';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Session() session) {
    const { passport } = session;
    return this.groupsService.create(createGroupDto, passport.user);
  }

  @Get()
  findAll(@Query('students', queryBoolPipe) students: boolean) {
    return this.groupsService.findAll({ students });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('students', queryBoolPipe) students: boolean,
  ) {
    return this.groupsService.findOne(+id, { students });
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}

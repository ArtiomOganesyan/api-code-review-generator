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
  findAll(
    @Query('students', queryBoolPipe) students: boolean,
    @Query('campus') campus: string,
  ) {
    return this.groupsService.findAll({ students, campus });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('students', queryBoolPipe) students: boolean,
  ) {
    const result = await this.groupsService.findOne(+id, { students });
    // TODO: more duck-tape for the God of duck-tape, findOne returns null if nothing was found.
    // However, on the client the don't see any result. So and empty object will have to suffice.
    if (!result) {
      return {};
    }
    return result;
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

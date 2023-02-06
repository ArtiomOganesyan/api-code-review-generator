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
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthenticatedGuard } from 'src/utils/guards/Authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() reviewData: CreateReviewDto, @Session() session) {
    const { passport } = session;
    return this.reviewsService.create(reviewData, passport);
  }

  @Get('/:studentId')
  findOne(@Param('studentId') studentId: number) {
    return this.reviewsService.findOne(studentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }
}

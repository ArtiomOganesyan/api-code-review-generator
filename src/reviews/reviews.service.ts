import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/typeorm/entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly ReviewRepo: Repository<Review>,
  ) {}

  async create(reviewData: CreateReviewDto, passport) {
    try {
      const result = await this.ReviewRepo.create({
        text: reviewData.text,
        grade: reviewData.grade,
        student: { id: reviewData.studentId },
        user: { id: passport.user.id },
      });

      return await this.ReviewRepo.save(result);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.ReviewRepo.findBy({ student: { id } });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateData: UpdateReviewDto) {
    try {
      return await this.ReviewRepo.update(
        { id },
        { text: updateData.text, grade: updateData.grade },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

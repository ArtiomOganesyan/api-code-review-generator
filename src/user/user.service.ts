import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from '../utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../typeorm/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserData: CreateUserDto) {
    try {
      const password = await hashPassword(createUserData.password);
      const user = this.userRepository.create({ ...createUserData, password });
      await this.userRepository.save(user);
      return { success: true };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.userRepository.find({ select: [] });
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    // #KNOW since the password is sensitive in the entities it is a hidden column
    // to add this column to the select need to use query builder and addSelect.
    const user = (await this.userRepository
      // #TODO why is it necessary to specify "user" in query builder if the repository is User
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne()) as unknown as User;

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

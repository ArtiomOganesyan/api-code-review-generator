import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import entities from './typeorm/entities/entities';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CampusModule } from './campus/campus.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: '123',
      database: 'code_review',
      entities: [...entities],
      synchronize: true,
    }),
    PassportModule.register({ session: true }),
    AuthModule,
    StudentsModule,
    TeachersModule,
    ReviewsModule,
    CampusModule,
    GroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import entities from './typeorm/entities/entities';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CampusModule } from './campus/campus.module';
import { GroupsModule } from './groups/groups.module';
import { TeachersModule } from './teachers/teachers.module';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from './utils/constants/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>(CONFIG.DB_HOST),
          port: configService.get<number>(CONFIG.DB_PORT),
          username: configService.get<string>(CONFIG.DB_USERNAME),
          password: configService.get<string>(CONFIG.DB_PASSWORD),
          database: configService.get<string>(CONFIG.DB_NAME),
          entities: [...entities],
          synchronize: true,
        };
      },
    }),
    PassportModule.register({ session: true }),
    AuthModule,
    StudentsModule,
    ReviewsModule,
    CampusModule,
    GroupsModule,
    TeachersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

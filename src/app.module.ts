import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CampusModule } from './campus/campus.module';
import { GroupsModule } from './groups/groups.module';
import { TeachersModule } from './teachers/teachers.module';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino/LoggerModule';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const env = configService.get('env');
        return env === 'production'
          ? {}
          : {
              pinoHttp: {
                transport: {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
              },
            };
      },
    }),
    UserModule,
    TypeOrmModule.forRoot(dataSourceOptions),
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

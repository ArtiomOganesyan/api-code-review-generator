import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ValidateUserMiddleware } from './middlewares/ValidateUser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { SERVICE } from 'src/utils/constants/constants';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: SERVICE.USER,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: SERVICE.USER,
      useClass: UserService,
    },
  ],
})

// #KNOW how to use middlewares.
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware).forRoutes(
      // for specific route
      {
        path: 'user',
        method: RequestMethod.GET,
      },
      // for all routes
      // UserController,
    );
  }
}

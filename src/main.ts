import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';
import { Session as SessionRepository } from './typeorm/entities/session.entity';
import { ConfigService } from '@nestjs/config';
import { CONFIG } from './utils/constants/constants';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  app.enableCors({
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    origin: ['http://localhost:3030', 'http://127.0.0.1:3030'],
  });

  const sessionRepository = app
    .get(DataSource)
    .getRepository(SessionRepository);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const sessionSecret = configService.get<string>(CONFIG.SESSION_SECRET);

  app.use(
    session({
      name: 'elbrus_cookie',
      secret: sessionSecret ?? 'secret',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = configService.get<number>(CONFIG.PORT);
  await app.listen(PORT ?? 4004);
}
bootstrap();

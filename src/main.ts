import { NestFactory } from '@nestjs/core';
import { RootModule } from './modules/root/root.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomOrigin } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

function swagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('LOGCON 2024')
    .setDescription('The LOGCON_2024 API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('document', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3000);

  let CORS_ORIGIN:
    | boolean
    | string
    | RegExp
    | (string | RegExp)[]
    | CustomOrigin = [];
  if (config.get<string>('CORS_ORIGIN')) {
    CORS_ORIGIN.push(...config.get<string>('CORS_ORIGIN', '*').split(','));
  }
  if (config.get<string>('CORS_REGEX_ORIGIN')) {
    CORS_ORIGIN.push(
      ...config
        .get<string>('CORS_REGEX_ORIGIN', '')
        .split(',')
        .map((regex) => new RegExp(regex)),
    );
  }
  if (CORS_ORIGIN.length === 0) {
    // CORS_ORIGIN = (_, cb) => cb(null, true);
    CORS_ORIGIN = true;
  }
  app.enableCors({
    origin: CORS_ORIGIN,
    methods: config.get<string>('CORS_METHODS', 'GET,PUT,PATCH,POST,DELETE'),
    credentials: config.get<boolean>('CORS_CREDENTIALS', true),
    preflightContinue: config.get<boolean>('CORS_PREFLIGHT', false),
    optionsSuccessStatus: config.get<number>('CORS_OPTIONS_STATUS', 204),
  });

  app.use(cookieParser());

  if (process.env.NODE_ENV !== 'production') {
    swagger(app);
    Logger.log(
      `Swagger is running on: http://localhost:${port}/document`,
      'Swagger',
    );
  }

  await app.listen(port);
  Logger.log(`Server is running on: http://localhost:${port}`, 'Bootstrap');
}
bootstrap();

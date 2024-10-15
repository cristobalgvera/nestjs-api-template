import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import express from 'express';
import helmet from 'helmet';
import packageJson from 'src/../package.json';
import { AppModule } from './app.module';

type EnvironmentOptions = Readonly<{ isServerless?: boolean }>;

const GLOBAL_PREFIX = 'api';

export async function setupApp(options: EnvironmentOptions = {}) {
  const expressApp = setupExpress();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  setupSwagger(app, options.isServerless);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return [app, expressApp] as const;
}

function setupExpress() {
  const expressApp = express();

  expressApp.use(helmet());

  expressApp.set('etag', false);

  return expressApp;
}

function setupSwagger(app: INestApplication, isServerless = false) {
  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();

  if (isServerless)
    app.setGlobalPrefix(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${process.env.NODE_ENV}/${packageJson.name}/${GLOBAL_PREFIX}`,
    );

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(GLOBAL_PREFIX, app, document);

  if (isServerless) app.setGlobalPrefix(GLOBAL_PREFIX);
}

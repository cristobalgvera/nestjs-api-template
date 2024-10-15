import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import express from 'express';
import helmet from 'helmet';
import packageJson from 'src/../package.json';
import { AppModule } from './app.module';

const GLOBAL_PREFIX = 'api';

export async function setupApp() {
  const expressApp = setupExpress();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  setupSwagger(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return [app, expressApp] as const;
}

function setupExpress() {
  const expressApp = express();

  expressApp.use(helmet());

  expressApp.set('etag', false);

  return expressApp;
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(packageJson.name)
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(GLOBAL_PREFIX, app, document);
}

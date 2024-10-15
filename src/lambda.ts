import { configure } from '@codegenie/serverless-express';
import { Handler } from 'aws-lambda';
import { setupApp } from './app.setup';

async function bootstrap() {
  const [app, expressApp] = await setupApp({ isServerless: true });

  await app.init();

  return configure({ app: expressApp });
}

let server: Handler | undefined;

export const handler: Handler<unknown, unknown> = async (
  event,
  context,
  callback,
) => {
  server ??= await bootstrap();

  return server(event, context, callback);
};

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupApp } from './app.setup';

async function bootstrap() {
  const [app] = await setupApp();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port, () => {
    Logger.log(`App is running on port ${String(port)}`, 'Bootstrap');
  });
}

void bootstrap();

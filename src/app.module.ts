import { CommonModule } from '@common/common.module';
import { FeaturesModule } from '@features/features.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule, FeaturesModule],
})
export class AppModule {}

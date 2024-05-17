import { Module } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { BucketController } from './bucket.controller';
import { GreenFieldModule } from 'src/pages/greenfield/greenfield.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/auth.config';

@Module({
  imports: [GreenFieldModule, ConfigModule.forFeature(authConfig)],
  controllers: [BucketController],
  providers: [BucketService],
})
export class BucketModule {}

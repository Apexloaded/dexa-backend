import { Module } from '@nestjs/common';
import { GreenFieldService } from './greenfield.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [GreenFieldService],
  exports: [GreenFieldService],
})
export class GreenFieldModule {}

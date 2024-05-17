import { Module } from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';
import { GreenFieldModule } from '../greenfield/greenfield.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GreenFieldModule, ConfigModule],
  controllers: [ObjectController],
  providers: [ObjectService],
  exports: [ObjectService]
})
export class ObjectModule {}

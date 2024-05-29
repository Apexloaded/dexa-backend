import { Module } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stream, StreamSchema } from './schemas/stream.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stream.name, schema: StreamSchema }]),
  ],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}

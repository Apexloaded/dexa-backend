import { Injectable } from '@nestjs/common';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Stream } from './schemas/stream.schema';
import { FilterQuery, Model, ProjectionType } from 'mongoose';

@Injectable()
export class StreamService {
  constructor(@InjectModel(Stream.name) private streamModel: Model<Stream>) {}

  create(createStreamDto: FilterQuery<Stream>) {
    return this.streamModel.create(createStreamDto);
  }

  findAll(filter: FilterQuery<Stream>, projection?: ProjectionType<Stream>) {
    return this.streamModel.find(filter, projection);
  }

  findOne(filter: FilterQuery<Stream>) {
    return this.streamModel.findOne(filter);
  }

  update(filter: FilterQuery<Stream>, updates: FilterQuery<Stream>) {
    return this.streamModel.updateOne(filter, updates);
  }

  remove(id: number) {
    return `This action removes a #${id} stream`;
  }
}

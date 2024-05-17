import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BucketService } from './bucket.service';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';
import { getErrorMsg } from 'src/helpers';
import { Response } from 'express';
import { apiResponse } from 'src/helpers/api.response';
import { Public } from 'src/decorators/public.decorator';

@Controller('bucket')
export class BucketController {
  constructor(private bucketService: BucketService) {}

  @Post('create')
  async create(@Body() createBucketDto: CreateBucketDto, @Res() res: Response) {
    try {
      const bucket = await this.bucketService.create(createBucketDto);
      const response = {
        code: bucket.code,
        hash: bucket.transactionHash,
        height: bucket.height,
        message: bucket.msgResponses
      };
      return res
        .status(HttpStatus.OK)
        .send(apiResponse(200, 'success', response));
    } catch (error) {
      console.log(error);
      return getErrorMsg(error);
    }
  }

  @Get()
  findAll() {
    return this.bucketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bucketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBucketDto: UpdateBucketDto) {
    return this.bucketService.update(+id, updateBucketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bucketService.remove(+id);
  }
}

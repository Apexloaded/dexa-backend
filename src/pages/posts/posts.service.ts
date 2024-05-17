import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GreenFieldService } from '../greenfield/greenfield.service';
import { generateId } from 'src/helpers';
import { ObjectService } from '../object/object.service';
import { MetaData, Post } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { Tip } from './schemas/tip.schema';

@Injectable()
export class PostsService {
  constructor(
    private readonly objService: ObjectService,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Tip.name) private tipModel: Model<Tip>,
    private readonly httpService: HttpService,
  ) {}

  async uploadPost(
    bucketName: string,
    objectName: string,
    blob: Blob,
    buffer: Buffer,
    visibility: string,
  ) {
    const createTx = await this.objService.create({
      bucketName,
      objectName: objectName,
      blob,
      visibility: Number(visibility),
    });

    const uploadTx = await this.objService.upload(
      bucketName,
      objectName,
      createTx.transactionHash,
      buffer,
    );
    return uploadTx;
  }

  async uploadPostImage(
    fileName: string,
    bucketName: string,
    file: Express.Multer.File,
    visibility: string,
    objectName: string,
  ) {
    const blob = new Blob([file.buffer], { type: file.mimetype });
    const fileBuffer = file.buffer;

    const createTx = await this.objService.create({
      bucketName,
      objectName: objectName,
      blob,
      visibility: Number(visibility),
    });

    const uploadTx = await this.objService.upload(
      bucketName,
      objectName,
      createTx.transactionHash,
      fileBuffer,
    );

    return uploadTx;
  }

  async uploadObject<T>(
    objectName: string,
    bucketName: string,
    payload: Partial<T>,
    visibility: string,
  ) {
    const jsonString = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const fileBuffer = Buffer.from(jsonString);
    const createTx = await this.objService.create({
      bucketName,
      objectName: objectName,
      blob,
      visibility: Number(visibility),
    });

    const uploadTx = await this.objService.upload(
      bucketName,
      objectName,
      createTx.transactionHash,
      fileBuffer,
    );

    return uploadTx;
  }

  async addPost(post: FilterQuery<Post>) {
    return await this.postModel.create(post);
  }

  async fetchPostContent(url: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(url).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          //this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAll(filter?: FilterQuery<Post>) {
    const matchFilter = filter || {};
    return this.postModel.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: 'wallet',
          as: 'user',
          pipeline: [
            { $addFields: { id: '$wallet' } },
            { $project: { name: 1, username: 1, id: 1, _id: 0 } },
          ],
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $addFields: { id: '$postId', creator: '$user' } },
      { $sort: { createdAt: -1 } },
      { $project: { postId: 0, user: 0, __v: 0, wallet: 0, _id: 0 } },
    ]);
  }

  async findOne(filter: FilterQuery<Post>) {
    return this.postModel.findOne(filter);
  }

  update(filter: FilterQuery<Post>, updatePostDto: UpdateQuery<Post>) {
    return this.postModel.updateOne(filter, updatePostDto);
  }

  async tipPost(tip: FilterQuery<Tip>) {
    return await this.tipModel.create(tip);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

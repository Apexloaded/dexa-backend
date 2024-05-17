import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ObjectService } from '../object/object.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly objService: ObjectService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async uploadImage(
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(filter: FilterQuery<User>) {
    return this.userModel.findOne(filter);
  }

  update(filter: FilterQuery<User>, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(filter, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

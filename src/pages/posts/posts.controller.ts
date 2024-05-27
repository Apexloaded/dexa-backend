import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  Res,
  UploadedFile,
  ParseFilePipeBuilder,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import {
  VALID_IMAGE_MIME_TYPES,
  VALID_VIDEO_MIME_TYPES,
  generateId,
  getErrorMsg,
  sizeToBytes,
} from 'src/helpers';
import { apiResponse } from 'src/helpers/api.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileTypeValidator } from 'src/validators/mimetype.validator';
import { ObjectService } from '../object/object.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../auth/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { PostEventEmitter } from './post.emitter';
import { Path } from 'src/enums/storage.path.enum';

@Controller('posts')
export class PostsController {
  private bucket: string;
  private sp: string;

  constructor(
    private readonly postsService: PostsService,
    private readonly objService: ObjectService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly postEvEmitter: PostEventEmitter,
  ) {
    this.bucket = this.configService.get<string>('BUCKET');
    this.sp = this.configService.get<string>('SP_HOST');
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('create')
  async create(
    @Req() req: Request,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new FileTypeValidator({
            fileType: [...VALID_VIDEO_MIME_TYPES, ...VALID_IMAGE_MIME_TYPES],
          }),
        )
        .addMaxSizeValidator({ maxSize: sizeToBytes(20, 'MB') })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const authUser = req['user'];
      const { content, visibility } = createPostDto;

      const fileName = `${generateId()}`;
      const baseUrl = `${this.sp}/view/${this.bucket}/${Path.FEEDS}/${fileName}`;

      const response = {
        tokenURI: `${this.sp}/view/${this.bucket}/${Path.METADATA}`,
        postId: fileName,
        nft: {
          url: `${baseUrl}/media`,
          mimetype: file.mimetype,
        },
      };
      // await this.postsService.addPost({
      //   creator: authUser.wallet,
      //   postId: fileName,
      //   content: content,
      //   mimetype: file.mimetype,
      //   visibility,
      // });
      // this.postEvEmitter.postCreated({
      //   file,
      //   fileName,
      //   visibility,
      // });
      return response;
    } catch (error) {
      console.log('error', error);
      return getErrorMsg(error);
    }
  }

  @Get('list')
  async findAll(@Req() req: Request) {
    const posts = await this.postsService.findAll({ isMinted: true });
    return posts;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const post = await this.postsService
        .findAll({
          postId: id,
          isMinted: true,
        })
        .then((result) => result[0]);
      if (!post) {
        throw new NotFoundException('post not found');
      }
      return post;
    } catch (error) {
      return getErrorMsg(error);
    }
  }
}

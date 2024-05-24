import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { generateId, getErrorMsg, sizeToBytes } from 'src/helpers';
import { Request, Response } from 'express';
import {
  FileSizeValidator,
  FileTypeValidator,
} from 'src/validators/files.validator';
import { ConfigService } from '@nestjs/config';
import { MessageEventEmitter } from './messages.emitter';
import { Path } from 'src/enums/storage.path.enum';

@Controller('messages')
export class MessagesController {
  private bucket: string;
  private sp: string;
  constructor(
    private readonly messagesService: MessagesService,
    private readonly configService: ConfigService,
    private readonly msgEvEmitter: MessageEventEmitter,
  ) {
    this.bucket = this.configService.get<string>('BUCKET');
    this.sp = this.configService.get<string>('SP_HOST');
  }

  @UseInterceptors(FileFieldsInterceptor([{ name: 'files' }]))
  @Post('create')
  async create(
    @Req() req: Request,
    @Body() createMsgDto: CreateMessageDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileSizeValidator({
            multiple: true,
            maxSizeBytes: sizeToBytes(5, 'MB'),
          }),
          new FileTypeValidator({
            multiple: true,
            filetype: /^image\/(jpeg|png|gif|bmp|webp|tiff)$/i,
          }),
        ],
      }),
    )
    files: { files: Express.Multer.File[] },
  ) {
    try {
      const authUser = req['user'];
      const baseUrl = `${this.sp}/view/${this.bucket}/${Path.CREATORS}/${authUser.wallet}`;

      const resData = [];
      const evData = [];

      files.files.map((file, i) => {
        const fileName = `${generateId()}`;
        const fileUrl = `${baseUrl}/${fileName}`;
        resData.push({
          url: fileUrl,
          mimetype: file.mimetype,
        });
        evData.push({
          file: file,
          fileName,
          mimetype: file.mimetype,
          path: fileUrl,
          creator: authUser.wallet,
        });
      });

      this.msgEvEmitter.fileUploaded(evData);
      return resData;
    } catch (error) {
      console.log('error', error);
      return getErrorMsg(error);
    }
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}

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
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipeBuilder,
  Res,
  ParseFilePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { apiResponse } from 'src/helpers/api.response';
import {
  VALID_IMAGE_MIME_TYPES,
  generateId,
  getErrorMsg,
  sizeToBytes,
} from 'src/helpers';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Path } from 'src/enums/storage.path.enum';
import { ConfigService } from '@nestjs/config';
import {
  FileSizeValidator,
  FileTypeValidator,
} from 'src/validators/files.validator';
import { UserEventEmitter } from './user.emitter';

@Controller('user')
export class UserController {
  private bucket: string;
  private sp: string;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly userEvEmitter: UserEventEmitter,
  ) {
    this.bucket = this.configService.get<string>('BUCKET');
    this.sp = this.configService.get<string>('SP_HOST');
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'pfp', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  @Post('update')
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
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
    files: { pfp: Express.Multer.File[]; banner: Express.Multer.File[] },
  ) {
    try {
      const authUser = req['user'];
      const baseUrl = `${this.sp}/view/${this.bucket}/${Path.CREATORS}/${authUser.wallet}`;

      const pfpFileName = generateId();
      const bannerFileName = generateId();
      const banner = files.banner[0];
      const pfp = files.pfp[0];

      const response = {
        pfpURI: `${baseUrl}/${pfpFileName}`,
        bannerURI: `${baseUrl}/${bannerFileName}`,
      };

      this.userEvEmitter.profileUpdated({
        creator: authUser.wallet,
        pfp,
        banner,
        pfpFileName,
        bannerFileName,
      });
      return response;
    } catch (error) {
      console.log('error', error);
      return getErrorMsg(error);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ wallet: id });
  }

  @Get('profile/:username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findOne({ username });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('onboarded')
  async userOnboarded(@Body() body: UpdateUserDto, @Req() req: Request) {
    try {
      const { isOnboarded, name, username } = body;
      const authUser = req['user'];
      await this.userService.update(
        { wallet: authUser.wallet },
        { name, username, isOnboarded },
      );
      const expire = 12 * 30 * 7 * 24 * 60 * 60;
      const payload = {
        ok: true,
        expiresIn: expire,
        wallet: authUser.wallet,
      };
      return apiResponse(HttpStatus.OK, 'success', payload);
    } catch (error) {
      return getErrorMsg(error);
    }
  }
}

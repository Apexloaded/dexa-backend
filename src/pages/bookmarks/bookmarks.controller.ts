import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Request } from 'express';
import { walletToLowercase } from 'src/helpers';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post('create')
  create(@Req() req: Request, @Body() createBookmarkDto: CreateBookmarkDto) {
    const authUser = req['user'];
    const filter = {
      userId: walletToLowercase(authUser.wallet),
      postId: createBookmarkDto.postId,
    };
    return this.bookmarksService.create(filter);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const authUser = req['user'];
    const filter = { userId: walletToLowercase(authUser.wallet) };
    return await this.bookmarksService.findAll(filter).sort({ createdAt: -1 });
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    const authUser = req['user'];
    const filter = { userId: walletToLowercase(authUser.wallet), postId: id };
    return this.bookmarksService.findOne(filter);
  }

  @Delete('remove/:id')
  remove(@Req() req: Request, @Param('id') id: string) {
    const authUser = req['user'];
    const filter = { userId: walletToLowercase(authUser.wallet), postId: id };
    return this.bookmarksService.remove(filter);
  }
}

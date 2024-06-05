import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './schemas/bookmark.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<Bookmark>,
  ) {}

  create(createBookmarkDto: FilterQuery<Bookmark>) {
    return this.bookmarkModel.create(createBookmarkDto);
  }

  findAll(filter: FilterQuery<Bookmark>) {
    return this.bookmarkModel.find(filter);
  }

  findOne(filter: FilterQuery<Bookmark>) {
    return this.bookmarkModel.findOne(filter);
  }

  remove(filter: FilterQuery<Bookmark>) {
    return this.bookmarkModel.deleteOne(filter);
  }
}

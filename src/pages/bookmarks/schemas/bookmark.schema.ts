import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookmarkDocument = HydratedDocument<Bookmark>;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ required: true, unique: true })
  postId: string;

  @Prop({ required: true })
  userId: string;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

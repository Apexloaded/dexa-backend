import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ lowercase: true, required: true })
  creator: string;

  @Prop({ unique: true, required: true })
  postId: string;

  @Prop()
  onchainId: string;

  @Prop()
  contentURI: string;

  @Prop()
  content: string;

  @Prop()
  visibility: string;

  @Prop()
  mimetype: string;

  @Prop()
  metaDataURI: string;

  @Prop({ default: false })
  isMinted: boolean;

  @Prop()
  remintPrice: string;

  @Prop()
  remintToken: string;

  @Prop()
  media: Media[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

export class Media {
  url: string;
  type: string;
}

export class MetaData {
  name: string;

  description: string;

  image: string;

  external_url: string;

  background_color: string;
}

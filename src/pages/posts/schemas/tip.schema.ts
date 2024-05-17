import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Tip {
  @Prop({ lowercase: true })
  sender: string;

  @Prop({ lowercase: true })
  creator: string;

  @Prop()
  tokenId: string;

  @Prop()
  postId: string;

  @Prop()
  price: string;

  @Prop()
  message: string;

  @Prop()
  tipToken: string;

  @Prop({ unique: true })
  tipId: string;

  @Prop({ unique: true })
  hash: string;

  @Prop()
  gnfdURI: string;
}

export const TipSchema = SchemaFactory.createForClass(Tip);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Stream {
  @Prop({ lowercase: true, required: true })
  creator: string;

  @Prop({ unique: true })
  ingressId: string;

  @Prop()
  serverUrl: string;

  @Prop({ unique: true })
  streamKey: string;

  @Prop({ default: false })
  isLive: boolean;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { generateId } from 'src/helpers';

export type WalletDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  wallet: string;

  @Prop()
  name: string;

  @Prop({ lowercase: true, unique: true, default: generateId() })
  username: string;

  @Prop()
  pfp: string;

  @Prop()
  banner: string;

  @Prop()
  bio: string;

  @Prop({ default: false })
  isOnboarded: boolean;

  @Prop()
  website: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

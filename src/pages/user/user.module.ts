import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserEventListener } from './user.listener';
import { UserEventEmitter } from './user.emitter';
import { ObjectModule } from '../object/object.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ObjectModule,
  ],
  controllers: [UserController, UserEventListener],
  providers: [UserService, UserEventEmitter],
  exports: [UserService],
})
export class UserModule {}

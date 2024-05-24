import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageEventEmitter } from './messages.emitter';
import { ObjectModule } from '../object/object.module';
import { UserModule } from '../user/user.module';
import { MsgEventListener } from './messeges.listener';

@Module({
  imports: [ObjectModule, UserModule],
  controllers: [MessagesController, MsgEventListener],
  providers: [MessagesService, MessageEventEmitter],
})
export class MessagesModule {}

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventTypes } from 'src/enums/events.enum';
import { FileUploaded } from './events/message.event';

@Injectable()
export class MessageEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  fileUploaded(payload: FileUploaded[]) {
    this.eventEmitter.emit(EventTypes.MsgMediaUploaded, payload);
  }
}

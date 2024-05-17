import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatorAddedEvent } from './events/creator-added.event';
import { EventTypes } from 'src/enums/events.enum';
import { CreatorOnboardedEvent } from './events/creator-onboarded.event';

@Injectable()
export class AuthEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  creatorAdded(payload: CreatorAddedEvent) {
    const { wallet } = payload;
    const event = new CreatorAddedEvent();
    event.wallet = wallet;
    this.eventEmitter.emit(EventTypes.NewCreator, event);
  }

  creatorOnboarded(payload: CreatorOnboardedEvent) {
    const { name, username, id } = payload;
    const event = new CreatorOnboardedEvent();
    event.id = id;
    event.name = name;
    event.username = username;
    this.eventEmitter.emit(EventTypes.CreatorOnboarded, event);
  }
}

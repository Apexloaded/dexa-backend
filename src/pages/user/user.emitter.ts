import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventTypes } from 'src/enums/events.enum';
import { ProfileUpdated } from './events/profile.event';

@Injectable()
export class UserEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  profileUpdated(payload: ProfileUpdated) {
    const event = new ProfileUpdated();
    event.pfp = payload.pfp;
    event.pfpFileName = payload.pfpFileName,
    event.banner = payload.banner;
    event.bannerFileName = payload.bannerFileName;
    event.creator = payload.creator;
    this.eventEmitter.emit(EventTypes.ProfileUpdated, event);
  }
}

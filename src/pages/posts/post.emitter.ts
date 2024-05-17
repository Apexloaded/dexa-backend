import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePostEvent } from './events/create-post.event';
import { EventTypes } from 'src/enums/events.enum';
import { PostMinted } from './events/post-minted.event';
import { PostTipped } from './events/post-tipped.event';

@Injectable()
export class PostEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  postCreated(payload: CreatePostEvent) {
    const event = new CreatePostEvent();
    event.file = payload.file;
    event.fileName = payload.fileName;
    event.visibility = payload.visibility;
    this.eventEmitter.emit(EventTypes.NewPost, event);
  }

  postMinted(payload: PostMinted) {
    console.log('post minted');
    const event = new PostMinted();
    event.creator = payload.creator;
    event.fileName = payload.fileName;
    event.tokenId = payload.tokenId.toString();
    event.price = payload.price.toString();
    event.tokenAddress = payload.tokenAddress;
    this.eventEmitter.emit(EventTypes.PostMinted, event);
  }

  postTipped(payload: PostTipped) {
    const event = new PostTipped();
    event.creator = payload.creator;
    event.sender = payload.sender;
    event.tokenId = payload.tokenId.toString();
    event.price = payload.price.toString();
    event.postId = payload.postId;
    event.message = payload.message;
    event.tipToken = payload.tipToken;
    event.tipId = payload.tipId.toString();
    event.hash = payload.hash.toString();
    this.eventEmitter.emit(EventTypes.PostTipped, event);
  }
}

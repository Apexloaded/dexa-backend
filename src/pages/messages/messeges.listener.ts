import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ObjectService } from '../object/object.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EventTypes } from 'src/enums/events.enum';

import { Path } from 'src/enums/storage.path.enum';
import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { FileUploaded } from './events/message.event';
import { UserService } from '../user/user.service';

@Controller()
export class MsgEventListener {
  private bucket: string;
  private sp: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.bucket = this.configService.get<string>('BUCKET');
    this.sp = this.configService.get<string>('SP_HOST');
  }

  /**
   * @EventListener listens to event @CreatePostEvent
   * This creates the all the relevant directories on greenfield
   * @param CreatePostEvent
   */
  @OnEvent(EventTypes.MsgMediaUploaded, { async: true })
  async profileUpdated(payload: FileUploaded[]) {
    console.log(payload);
    for (let i = 0; i < payload.length; i++) {
      const path = `${Path.CREATORS}/${payload[i].creator}/${payload[i].fileName}`;
      const res = await this.userService.uploadImage(
        this.bucket,
        payload[i].file,
        `${VisibilityType.VISIBILITY_TYPE_PUBLIC_READ}`,
        path,
      );
      console.log(res);
    }
  }
}

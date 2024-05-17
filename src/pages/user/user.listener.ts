import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ObjectService } from '../object/object.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EventTypes } from 'src/enums/events.enum';
import { ProfileUpdated } from './events/profile.event';
import { UserService } from './user.service';
import { Path } from 'src/enums/storage.path.enum';
import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';

@Controller()
export class UserEventListener {
  private bucket: string;
  private sp: string;

  constructor(
    private readonly objService: ObjectService,
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
  @OnEvent(EventTypes.ProfileUpdated, { async: true })
  async profileUpdated(payload: ProfileUpdated) {
    const pfpPath = `${Path.CREATORS}/${payload.creator}/${payload.pfpFileName}`;
    const bannerPath = `${Path.CREATORS}/${payload.creator}/${payload.bannerFileName}`;
    console.log('UPLOADING....');
    const uploadPFP = await this.userService.uploadImage(
      this.bucket,
      payload.pfp,
      `${VisibilityType.VISIBILITY_TYPE_PUBLIC_READ}`,
      pfpPath,
    );
    console.log('PFP DONE.... STARTING BANNER....');
    const uploadBanner =await this.userService.uploadImage(
      this.bucket,
      payload.banner,
      `${VisibilityType.VISIBILITY_TYPE_PUBLIC_READ}`,
      bannerPath,
    );
    console.log('BANNER DONE');
    
    //const [pfpRes, bannerRes] = await Promise.all([uploadPFP, uploadBanner]);
    console.log(uploadPFP);
    console.log(uploadBanner);
    console.log('DONE...')
  }
}

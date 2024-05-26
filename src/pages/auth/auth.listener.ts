import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventTypes } from 'src/enums/events.enum';
import { CreatorAddedEvent } from './events/creator-added.event';
import { ObjectService } from '../object/object.service';
import { ConfigService } from '@nestjs/config';
import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { getErrorMsg, walletToLowercase } from 'src/helpers';
import { CreatorOnboardedEvent } from './events/creator-onboarded.event';
import { Path } from 'src/enums/storage.path.enum';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { generateNonce } from 'siwe';

@Controller()
export class AuthEventListener {
  private bucket: string;
  private sp: string;

  constructor(
    private readonly objService: ObjectService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    this.bucket = this.configService.get<string>('BUCKET');
    this.sp = this.configService.get<string>('SP_HOST');
  }

  /**
   * @EventListener listens to event @CreatorAddedEvent
   * This creates the user directory on greenfield
   * @param CreatorAddedEvent
   */
  @OnEvent(EventTypes.NewCreator, { async: true })
  async creatorAdded(payload: CreatorAddedEvent) {
    try {
      const { wallet } = payload;
      await this.objService.creatFolder({
        bucketName: this.bucket,
        folderName: `${Path.CREATORS}/${wallet}`,
        visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
      });
    } catch (error: any) {
      console.log(error);
      getErrorMsg(error);
    }
  }

  /**
   * @EventListener listens to event @CreatorOnboardedEvent
   * This updates users profile based on event
   * @param CreatorOnboardedEvent
   */
  @OnEvent(EventTypes.CreatorOnboarded, { async: true })
  async creatorOnboarded(payload: CreatorOnboardedEvent) {
    try {
      const { name, username, id } = payload;
      const userAuth = await this.authService.findOne({
        wallet: walletToLowercase(id),
      });
      if (userAuth) {
        return;
      }

      const nonce = generateNonce();
      const newUserAuth = {
        wallet: walletToLowercase(id),
        nonce: nonce,
      };
      await this.authService.create(newUserAuth);
      await this.userService.create({
        wallet: newUserAuth.wallet,
        name,
        username,
      });
      
    } catch (error: any) {
      console.log(error);
      getErrorMsg(error);
    }
  }

  /**
   * @EventListener listens to event @CreatorOnboardedEvent
   * This creates the user profile on greenfield
   * @param CreatorOnboardedEvent
   */
  @OnEvent(EventTypes.CreatorOnboarded, { async: true })
  async onPFPUpload(payload: CreatorOnboardedEvent) {
    try {
      const bucketName = this.bucket;
      const jsonString = JSON.stringify(payload, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const fileBuffer = Buffer.from(jsonString);
      const objectName = `${Path.CREATORS}/${payload.id}/profile`;
      const createTx = await this.objService.create({
        bucketName,
        objectName,
        blob,
        visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
      });

      const uploadTx = await this.objService.upload(
        bucketName,
        objectName,
        createTx.transactionHash,
        fileBuffer,
      );

      console.log(uploadTx);
    } catch (error: any) {
      console.log(error);
      getErrorMsg(error);
    }
  }
}

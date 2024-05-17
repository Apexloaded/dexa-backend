import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventTypes } from 'src/enums/events.enum';
import { CreatePostEvent } from './events/create-post.event';
import { ObjectService } from '../object/object.service';
import { ConfigService } from '@nestjs/config';
import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { getErrorMsg } from 'src/helpers';
import { PostsService } from './posts.service';
import { PostMinted } from './events/post-minted.event';
import { AuthService } from '../auth/auth.service';
import { Post } from 'src/interfaces/post.interface';
import { Path } from 'src/enums/storage.path.enum';
import { PostTipped } from './events/post-tipped.event';
import { CreatorContractService } from '../contracts/creator-contract/creator-contract.service';

@Controller()
export class PostEventListener {
  private bucket: string;
  private sp: string;

  constructor(
    private readonly objService: ObjectService,
    private readonly configService: ConfigService,
    private readonly postsService: PostsService,
    private readonly authService: AuthService,
    private readonly creatorCntrService: CreatorContractService
  ) {
    this.bucket = this.configService.get<string>('BUCKET');
    this.sp = this.configService.get<string>('SP_HOST');
  }

  /**
   * @EventListener listens to event @CreatePostEvent
   * This creates the all the relevant directories on greenfield
   * @param CreatePostEvent
   */
  @OnEvent(EventTypes.NewPost, { async: true })
  async postAdded(payload: CreatePostEvent) {
    try {
      const { file, fileName, visibility } = payload;

      // Create posts root directory using fileName
      await this.objService.creatFolder({
        bucketName: this.bucket,
        folderName: `${Path.FEEDS}/${fileName}`,
        visibility: Number(visibility),
      });

      const objectName = `${Path.FEEDS}/${fileName}/media`;
      // Upload media file to created folder
      await this.postsService.uploadPostImage(
        fileName,
        this.bucket,
        file,
        visibility,
        objectName,
      );
    } catch (error: any) {
      getErrorMsg(error);
    }
  }

  /**
   * @EventListener listens to event @PostMinted
   * This creates and uploads the post on greenfield
   * @param PostMinted
   */
  @OnEvent(EventTypes.PostMinted, { async: true })
  async postMinted(payload: PostMinted) {
    try {
      const { fileName, creator, tokenId, price, tokenAddress } = payload;
      const baseUrl = `${this.sp}/view/${this.bucket}/${Path.FEEDS}/${fileName}`;
      const post = await this.postsService.findOne({ postId: fileName });
      const userBio = await this.creatorCntrService.findOne(creator);
      console.log(userBio);

      const metadata = {
        name: `Dexa Feeds #${tokenId}`,
        description: `${post.content}`,
        image: `${baseUrl}/media`,
        external_url: `https://dexa.ink/${userBio.username}/mint/${fileName}`,
        background_color: '#ffffff',
      };
      const objName = `${Path.METADATA}/${tokenId}.json`;
      const uploadMetaData = await this.postsService.uploadObject(
        objName,
        this.bucket,
        metadata,
        post.visibility,
      );

      const postContent = {
        onchainId: tokenId,
        remintPrice: price,
        remintToken: tokenAddress,
        media: [],
      };
      if (uploadMetaData.code == 0) {
        postContent.media.push({
          url: `${baseUrl}/media`,
          type: post.mimetype,
        });
      }

      await this.postsService.update(
        { postId: fileName },
        {
          ...postContent,
          isMinted: true,
          metaDataURI: `${this.sp}/view/${this.bucket}/${objName}`,
        },
      );
    } catch (error: any) {
      console.log(error);
      getErrorMsg(error);
    }
  }

  /**
   * @EventListener listens to event @PostTipped
   * This stores tips object on gnfd bucket
   * @param PostMinted
   */
  @OnEvent(EventTypes.PostTipped, { async: true })
  async postTipped(payload: PostTipped) {
    try {
      const baseUrl = `${this.sp}/view/${this.bucket}/${Path.TIP}/${payload.tipId}.json`;
      const tip = await this.postsService.tipPost({
        ...payload,
        gnfdURI: baseUrl,
      });
      const objName = `${Path.TIP}/${payload.tipId}.json`;
      const uploadTipRes = await this.postsService.uploadObject(
        objName,
        this.bucket,
        payload,
        `${VisibilityType.VISIBILITY_TYPE_PUBLIC_READ}`,
      );
      console.log(uploadTipRes);
    } catch (error) {
      console.log(error);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  NotImplementedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { CreateStreamDto, CreateViewerTokenDto } from './dto/create-stream.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { getErrorMsg, walletToLowercase } from 'src/helpers';
import { dynamicImport } from 'tsimportlib';
import { type IngressClient } from 'livekit-server-sdk/dist/IngressClient';
import { type RoomServiceClient } from 'livekit-server-sdk/dist/RoomServiceClient';
import { type WebhookReceiver } from 'livekit-server-sdk/dist/WebhookReceiver';
import { Public } from 'src/decorators/public.decorator';
type LiveKitModule = typeof import('livekit-server-sdk');
globalThis.crypto ??= require('node:crypto').webcrypto;

@Controller('stream')
export class StreamController {
  private liveKit: LiveKitModule;
  private roomService: RoomServiceClient;
  private ingressClient: IngressClient;
  private webHook: WebhookReceiver;
  constructor(
    private readonly streamService: StreamService,
    private readonly configService: ConfigService,
  ) {
    dynamicImport('livekit-server-sdk', module).then((lk) => {
      this.liveKit = lk;
      this.roomService = new lk.RoomServiceClient(
        this.configService.get('STREAM_URL'),
        this.configService.get('STREAM_KEY'),
        this.configService.get('STREAM_SECRET'),
      );
      this.ingressClient = new lk.IngressClient(
        this.configService.get('STREAM_URL'),
        this.configService.get('STREAM_KEY'),
        this.configService.get('STREAM_SECRET'),
      );
      this.webHook = new lk.WebhookReceiver(
        this.configService.get('STREAM_KEY'),
        this.configService.get('STREAM_SECRET'),
      );
    });
  }

  @Post('ingress/request')
  async createIngress(
    @Req() req: Request,
    @Body() createStreamDto: CreateStreamDto,
  ) {
    const authUser = req['user'];
    const wallet = walletToLowercase(authUser.wallet);
    const { username, ingressType } = createStreamDto;
    await this.resetIngresses(wallet);
    const options: any = {
      name: username,
      roomName: wallet,
      participantName: username,
      participantIdentity: wallet,
    };

    if (ingressType === this.liveKit.IngressInput.WHIP_INPUT) {
      options.enableTranscoding = false;
    } else {
      options.video = {
        source: this.liveKit.TrackSource.CAMERA,
        encodingOptions: {
          case: 'preset',
          value:
            this.liveKit.IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        },
      };
      options.audio = {
        source: this.liveKit.TrackSource.MICROPHONE,
        encodingOptions: {
          case: 'preset',
          value: this.liveKit.IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
        },
      };
    }

    const ingress = await this.ingressClient.createIngress(
      ingressType,
      options,
    );

    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new NotImplementedException('Failed to generate');
    }

    const payload = {
      creator: wallet,
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    };

    const userStream = await this.streamService.findOne({ creator: wallet });
    if (!userStream) {
      await this.streamService.create(payload);
    } else {
      await this.streamService.update({ creator: wallet }, payload);
    }
    return payload;
  }

  @Post('viewer/credentials')
  async generateViewerToken(
    @Req() req: Request,
    @Body() body: CreateViewerTokenDto,
  ) {
    try {
      const authUser = req['user'];
      const currentUser = walletToLowercase(authUser.wallet);
      const { hostIdentity, username } = body;
      const roomName = walletToLowercase(hostIdentity);
      const host = await this.streamService.findOne({
        creator: roomName,
      });
      if (!host) {
        throw new NotFoundException('Host not found');
      }
      const isHost = currentUser === roomName;
      const token = new this.liveKit.AccessToken(
        this.configService.get('STREAM_KEY'),
        this.configService.get('STREAM_SECRET'),
        {
          identity: isHost ? `host-${currentUser}` : currentUser,
          name: username,
        },
      );
      token.addGrant({
        room: roomName,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
      });
      const accessToken = await Promise.resolve(token.toJwt());
      return { token: accessToken };
    } catch (error) {
      return getErrorMsg(error);
    }
  }

  @Get('ingress/credentials')
  async getStreamCredentials(@Req() req: Request) {
    const authUser = req['user'];
    const wallet = walletToLowercase(authUser.wallet);
    const data = await this.streamService.findOne({ creator: wallet });
    return data;
  }

  @Get('status/:id')
  async userStreamStatus(@Param('id') id: string) {
    try {
      const host = await this.streamService.findOne({
        creator: walletToLowercase(id),
      });
      if (!host) {
        return { status: false };
      }
      return { status: host.isLive };
    } catch (error) {
      return getErrorMsg(error);
    }
  }

  @Public()
  @Post('webhook/livekit')
  async webHookLiveKit(@Req() req: Request) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const raw = req.body;
    const event = await this.webHook.receive(raw, authorization);
    console.log(event);
    if (event.event === 'ingress_ended') {
      await this.streamService.update(
        { ingressId: event.ingressInfo.ingressId },
        { isLive: false },
      );
    }
    if (event.event === 'ingress_started') {
      await this.streamService.update(
        { ingressId: event.ingressInfo.ingressId },
        { isLive: true },
      );
    }
  }

  private async resetIngresses(hostId: string) {
    const ingresses = await this.ingressClient.listIngress({
      roomName: hostId,
    });
    const rooms = await this.roomService.listRooms([hostId]);
    for (const room of rooms) {
      await this.roomService.deleteRoom(room.name);
    }
    for (const ingress of ingresses) {
      if (ingress.ingressId) {
        await this.ingressClient.deleteIngress(ingress.ingressId);
      }
    }
  }
}

import {
  Controller,
  Get,
  Res,
  Query,
  UnauthorizedException,
  Post,
  Req,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { isEthereumAddress } from 'class-validator';
import { Response } from 'express';
import { SiweMessage, generateNonce } from 'siwe';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { getErrorMsg, walletToLowercase } from 'src/helpers';
import { VerifyNonceDto } from './dto/verify-nonce.dto';
import { Cookies } from 'src/enums/cookie.enum';
import { AuthEventEmitter } from './auth.emitter';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authEmitter: AuthEventEmitter,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get('nonce/generate')
  async generateNonce(@Query('wallet') wallet: string) {
    try {
      const isEthAddr = isEthereumAddress(wallet);
      if (!isEthAddr) {
        return new UnauthorizedException('Unauthorized access');
      }

      const userAuth = await this.authService.findOne({
        wallet: walletToLowercase(wallet),
      });
      if (userAuth) {
        return { nonce: userAuth.nonce };
      }

      const nonce = generateNonce();
      const newUserAuth = {
        wallet: walletToLowercase(wallet),
        nonce: nonce,
      };
      await this.authService.create(newUserAuth);
      await this.userService.create({ wallet: newUserAuth.wallet });
      this.authEmitter.creatorAdded({ wallet: newUserAuth.wallet });

      return { nonce: nonce };
    } catch (error) {
      return getErrorMsg(error);
    }
  }

  @Public()
  @Post('nonce/verify')
  async verifyNonce(@Body() body: VerifyNonceDto) {
    try {
      const { message, signature } = body;

      const siweMessage = new SiweMessage(message);
      const fields = await siweMessage.verify({ signature });
      const [userAuth, user] = await Promise.all([
        this.authService.findOne({
          wallet: walletToLowercase(fields.data.address),
        }),
        this.userService.findOne({
          wallet: walletToLowercase(fields.data.address),
        }),
      ]);

      if (!userAuth || userAuth.wallet == undefined)
        throw new UnauthorizedException('Unauthorized user');

      if (fields.data.nonce !== userAuth.nonce)
        throw new NotFoundException('Incorrect nonce');

      const nonce = generateNonce();
      const accessToken = await this.authService.signIn(message, {
        wallet: userAuth.wallet,
        nonce: nonce,
      });

      await this.authService.update(
        {
          wallet: walletToLowercase(fields.data.address),
        },
        { nonce: nonce },
      );

      const expire = 7 * 24 * 60 * 60;
      const payload = {
        ok: true,
        token: accessToken,
        user: user,
        expiresIn: expire,
      };
      console.log(payload);
      return payload;
    } catch (error) {
      return getErrorMsg(error);
    }
  }

  @Get('session/verify')
  async verify(@Req() req: Request) {
    try {
      const authUser = req['user'];
      const user = await this.authService.findOne({ wallet: authUser.wallet });
      if (user) return { message: 'success' };
    } catch (error) {
      return getErrorMsg(error);
    }
  }

  @Get('onboarding/progress')
  async verifyProgress(@Req() req: Request) {
    try {
      const authUser = req['user'];
      const user = await this.userService.findOne({ wallet: authUser.wallet });
      const selectedFields = ['name', 'username'];
      const completedFields = selectedFields.filter(
        (fieldName) =>
          user[fieldName] !== null &&
          user[fieldName] !== undefined &&
          user[fieldName] !== false,
      ).length;

      const completetionPercentage =
        (completedFields / selectedFields.length) * 100;

      const payload = {
        progress: completetionPercentage,
      };
      return payload;
    } catch (error) {
      return getErrorMsg(error);
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      res.clearCookie(Cookies.ACCESS_TOKEN);
      return { ok: true };
    } catch (error: any) {
      return getErrorMsg(error);
    }
  }
}

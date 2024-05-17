import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { AuthService } from 'src/pages/auth/auth.service';
import { Cookies } from 'src/enums/cookie.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.authService.validateToken(token);
      const isUser = await this.authService.findOne({
        wallet: payload.wallet.toLowerCase(),
      });
      if (!isUser) {
        throw new UnauthorizedException();
      }

      request['user'] = payload;
      return true;
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookies = request.cookies;
    if (!cookies) {
      throw new UnauthorizedException();
    }
    const accessToken = (
      cookies[Cookies.ACCESS_TOKEN] ||
      request.headers.authorization ||
      ''
    ).replace(/^Bearer\s/, '');
    //const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //return type === 'Bearer' ? token : undefined;
    return accessToken ? accessToken : undefined;
  }
}

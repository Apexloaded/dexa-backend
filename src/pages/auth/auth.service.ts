import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { SiweMessage } from 'siwe';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private httpService: HttpService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    return await this.authModel.create(createAuthDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(filter: FilterQuery<Auth>) {
    return this.authModel.findOne(filter);
  }

  update(filter: FilterQuery<Auth>, updateAuthDto: UpdateQuery<Auth>) {
    return this.authModel.updateOne(filter, updateAuthDto);
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async signIn(message: Partial<SiweMessage>, user: CreateAuthDto) {
    const payload = {
      ...message,
      ...user,
    };
    return await this.getTokens(payload);
  }

  async getTokens(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('expiresIn'),
    });
    return accessToken;
  }

  async validateToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('jwtKey'),
    });
  }

  async fetchUserBio(user: Auth) {
    const { data } = await firstValueFrom(
      this.httpService.get(user.bioURI).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}

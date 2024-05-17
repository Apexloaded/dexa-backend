import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { ObjectModule } from '../object/object.module';
import { AuthEventListener } from './auth.listener';
import { AuthEventEmitter } from './auth.emitter';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('jwtKey'),
        signOptions: {
          expiresIn: configService.get<string>('expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    ConfigModule,
    ObjectModule,
    HttpModule,
    UserModule
  ],
  controllers: [AuthController, AuthEventListener],
  providers: [AuthService, AuthEventEmitter],
  exports: [AuthService, AuthEventEmitter],
})
export class AuthModule {}

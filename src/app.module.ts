import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import contractConfig from './config/contract.config';
import redisConfig from './config/redis.config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthModule } from './pages/auth/auth.module';
import { RolesGuard } from './guards/role/role.guard';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { GreenFieldModule } from './pages/greenfield/greenfield.module';
import { BucketModule } from './pages/bucket/bucket.module';
import { PostsModule } from './pages/posts/posts.module';
import { ObjectModule } from './pages/object/object.module';
import { HttpModule } from '@nestjs/axios';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
// import type { RedisClientOptions } from 'redis';
// import { redisStore } from 'cache-manager-redis-store';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CreatorContractModule } from './pages/contracts/creator-contract/creator-contract.module';
import { FeedsContractModule } from './pages/contracts/feeds-contract/feeds-contract.module';
import { FeedsTokenContractModule } from './pages/contracts/feeds-token-contract/feeds-token-contract.module';
import { UserModule } from './pages/user/user.module';
import { MessagesModule } from './pages/messages/messages.module';
import { StreamModule } from './pages/stream/stream.module';
import { applyRawBodyOnlyTo } from '@golevelup/nestjs-webhooks';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      cache: true,
      load: [appConfig, authConfig, contractConfig, redisConfig],
      expandVariables: true,
    }),
    HttpModule,
    EventEmitterModule.forRoot(),
    CacheModule.register({ ttl: 60 * 60 * 1000 }),
    // CacheModule.registerAsync<RedisClientOptions>({
    //   imports: [ConfigModule],
    //   // @ts-ignore
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       store: async () =>
    //         await redisStore({
    //           socket: {
    //             host: 'localhost',
    //             port: 6379,
    //           },
    //           password: configService.get('RedisPass'),
    //           username: configService.get('RedisUser'),
    //           url: configService.get('RedisUrl'),
    //         }),
    //       ttl: 24 * 60 * 60 * 1000,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    CreatorContractModule,
    FeedsContractModule,
    FeedsTokenContractModule,
    AuthModule,
    GreenFieldModule,
    BucketModule,
    PostsModule,
    ObjectModule,
    UserModule,
    MessagesModule,
    StreamModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    applyRawBodyOnlyTo(consumer, {
      method: RequestMethod.ALL,
      path: 'stream/webhook/livekit',
    });
  }
}

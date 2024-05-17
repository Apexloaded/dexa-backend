import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ObjectModule } from '../object/object.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Post } from './schemas/post.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { PostEventEmitter } from './post.emitter';
import { PostEventListener } from './post.listener';
import { Tip, TipSchema } from './schemas/tip.schema';
import { CreatorContractModule } from '../contracts/creator-contract/creator-contract.module';

@Module({
  imports: [
    ObjectModule,
    HttpModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Tip.name, schema: TipSchema },
    ]),
    AuthModule,
    CreatorContractModule
  ],
  controllers: [PostsController, PostEventListener],
  providers: [PostsService, PostEventEmitter],
  exports: [PostEventEmitter],
})
export class PostsModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeedsContractService } from './feeds-contract.service';
import contractConfig from 'src/config/contract.config';
import { PostsModule } from 'src/pages/posts/posts.module';

@Module({
  imports: [ConfigModule.forFeature(contractConfig), PostsModule],
  providers: [FeedsContractService],
  exports: [FeedsContractService],
})
export class FeedsContractModule {}

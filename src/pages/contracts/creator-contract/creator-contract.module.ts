import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreatorContractService } from './creator-contract.service';
import contractConfig from 'src/config/contract.config';
import { AuthModule } from 'src/pages/auth/auth.module';

@Module({
  imports: [ConfigModule.forFeature(contractConfig), AuthModule],
  providers: [CreatorContractService],
  exports: [CreatorContractService],
})
export class CreatorContractModule {}

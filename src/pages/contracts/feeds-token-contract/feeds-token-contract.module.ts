import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeedsTokenContractService } from './feeds-token-contract.service';
import contractConfig from 'src/config/contract.config';

@Module({
  imports: [ConfigModule.forFeature(contractConfig)],
  providers: [FeedsTokenContractService],
  exports: [FeedsTokenContractService],
})
export class FeedsTokenContractModule {}

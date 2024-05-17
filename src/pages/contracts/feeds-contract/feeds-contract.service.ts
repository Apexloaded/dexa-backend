import { OnModuleInit, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ethers,
  Contract,
  ContractEventPayload,
} from 'ethers';
import { FeedsABI } from './abi/feeds.abi';
import { PostEventEmitter } from 'src/pages/posts/post.emitter';

@Injectable()
export class FeedsContractService implements OnModuleInit {
  private contract: ethers.Contract;
  private provider: ethers.JsonRpcProvider;
  private filter: Record<string, ethers.ContractEvent<any[]>>;

  constructor(
    private configService: ConfigService,
    private postEvEmitter: PostEventEmitter,
  ) {}

  async onModuleInit() {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('BSC_TESTNET'),
    );

    this.contract = new Contract(
      this.configService.get<string>('DEXA_FEEDS'),
      FeedsABI,
      this.provider,
    );

    this.filter = this.contract.filters;
    this.listener();
  }

  private listener() {
    this.contract.on(
      this.filter.PostMinted(),
      (event: ContractEventPayload) => {
        const { args } = event;
        console.log(args);
        this.postEvEmitter.postMinted({
          tokenId: args[1],
          creator: args[0],
          fileName: args[2],
          tokenAddress: args[3],
          price: args[4],
        });
        event.removeListener();
      },
    );

    this.contract.on(
      this.filter.Tipped(),
      (event: ContractEventPayload) => {
        const hash = event.log.blockHash;
        const { args } = event;
        this.postEvEmitter.postTipped({
          sender: args[0],
          creator: args[1],
          price: args[2],
          tokenId: args[3],
          postId: args[4],
          message: args[5],
          tipToken: args[6],
          tipId: args[7],
          hash,
        });
        event.removeListener();
      },
    );
  }
}

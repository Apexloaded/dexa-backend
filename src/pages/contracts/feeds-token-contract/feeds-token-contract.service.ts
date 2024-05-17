import { OnModuleInit, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, Contract, ContractEvent } from 'ethers';
import { FeedsTokenABI } from './abi/feeds-token.abi';

@Injectable()
export class FeedsTokenContractService implements OnModuleInit {
  private contract: ethers.Contract;
  private provider: ethers.JsonRpcProvider;
  private filter: Record<string, ethers.ContractEvent<any[]>>;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('BSC_TESTNET'),
    );

    this.contract = new Contract(
      this.configService.get<string>('FEEDS_TOKEN'),
      FeedsTokenABI,
      this.provider,
    );

    this.filter = this.contract.filters;
    this.listener();
  }

  private listener() {
    // const courseMinted = this.filter.NewCourseMinted();
    // this.contract.on(
    //   courseMinted,
    //   (tokenId, contractAddress, ownerAddress, courseId, event) => {
    //     console.log(event);
    //     const ev = new CourseMintedEvent();
    //     ev.courseId = courseId;
    //     ev.creator = ownerAddress;
    //     ev.tokenId = tokenId;
    //     ev.hash = event.transactionHash;
    //     this.eventEmitter.emit(EventTypes.CourseMinted, ev);
    //   },
    // );
  }
}
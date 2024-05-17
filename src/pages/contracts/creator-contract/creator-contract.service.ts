import { OnModuleInit, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ethers,
  Contract,
  ContractEvent,
  ContractEventPayload,
  WebSocketProvider,
} from 'ethers';
import { CreatorABI } from './abi/creator.abi';
import { AuthEventEmitter } from 'src/pages/auth/auth.emitter';

@Injectable()
export class CreatorContractService implements OnModuleInit {
  private contract: ethers.Contract;
  private provider: ethers.JsonRpcProvider;
  private socket: ethers.WebSocketProvider;
  private ev;

  constructor(
    private configService: ConfigService,
    private readonly AuthEvEmitter: AuthEventEmitter,
  ) {}

  async onModuleInit() {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('BSC_TESTNET'),
    );

    this.contract = new Contract(
      this.configService.get<string>('DEXA_CREATOR'),
      CreatorABI,
      this.provider,
    );

    this.socket = new WebSocketProvider(
      this.configService.get<string>('BSC_SOCKET_TESTNET'),
    );
    this.ev = this.contract.connect(this.socket);
    this.listener();
  }

  private listener() {
    this.contract.on(
      this.ev.filters.NewCreator(),
      (event: ContractEventPayload) => {
        const { args } = event;
        this.AuthEvEmitter.creatorOnboarded({
          id: args[0],
          name: args[1],
          username: args[2],
        });
        event.removeListener();
      },
    );
  }

  async findOne(wallet: string) {
    return await this.contract.findCreator(wallet);
  }
}

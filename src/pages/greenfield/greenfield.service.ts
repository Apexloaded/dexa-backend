import { OnModuleInit, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, Contract, ContractEvent } from 'ethers';
import { Client } from '@bnb-chain/greenfield-js-sdk';

@Injectable()
export class GreenFieldService implements OnModuleInit {
  private gnfd: Client;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.gnfd = Client.create(
      this.configService.get<string>('GNFD_RPC_URL'),
      this.configService.get<string>('GNFD_CHAIN'),
    );
  }

  get client() {
    return this.gnfd;
  }

  getSps = async () => {
    const sps = await this.gnfd.sp.getStorageProviders();
    const finalSps = (sps ?? []).filter((v: any) =>
      v.endpoint.includes('nodereal'),
    );

    return finalSps;
  };

  getAllSps = async () => {
    const sps = await this.getSps();

    return sps.map((sp) => {
      return {
        address: sp.operatorAddress,
        endpoint: sp.endpoint,
        name: sp.description?.moniker,
      };
    });
  };

  selectSp = async () => {
    const finalSps = await this.getSps();

    const selectIndex = Math.floor(Math.random() * finalSps.length);

    const secondarySpAddresses = [
      ...finalSps.slice(0, selectIndex),
      ...finalSps.slice(selectIndex + 1),
    ].map((item) => item.operatorAddress);
    const selectSpInfo = {
      id: finalSps[selectIndex].id,
      endpoint: finalSps[selectIndex].endpoint,
      primarySpAddress: finalSps[selectIndex]?.operatorAddress,
      sealAddress: finalSps[selectIndex].sealAddress,
      secondarySpAddresses,
    };

    return selectSpInfo;
  };
}

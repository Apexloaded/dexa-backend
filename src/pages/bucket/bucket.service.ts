import { Injectable } from '@nestjs/common';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';
import { GreenFieldService } from '../greenfield/greenfield.service';
import { ConfigService } from '@nestjs/config';
import { Long } from '@bnb-chain/greenfield-js-sdk';

@Injectable()
export class BucketService {
  constructor(
    private readonly gnfd: GreenFieldService,
    private readonly configService: ConfigService,
  ) {}

  async create(createBucketDto: CreateBucketDto) {
    const spInfo = await this.gnfd.selectSp();
    const createBucketTx = await this.gnfd.client.bucket.createBucket({
      bucketName: createBucketDto.name,
      creator: this.configService.get('ADMIN_WALLET'),
      visibility: createBucketDto.visibility,
      chargedReadQuota: Long.fromString('0'),
      primarySpAddress: spInfo.primarySpAddress,
      paymentAddress: this.configService.get('ADMIN_WALLET'),
    });
    const simulateInfo = await createBucketTx.simulate({
      denom: 'BNB',
    });
    const broadcastRes = await createBucketTx.broadcast({
      denom: 'BNB',
      gasLimit: Number(simulateInfo.gasLimit),
      gasPrice: simulateInfo.gasPrice,
      payer: this.configService.get('ADMIN_WALLET'),
      granter: "",
      privateKey: this.configService.get('ADMIN_KEY'),
    });
    return broadcastRes;
  }

  findAll() {
    return `This action returns all bucket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bucket`;
  }

  update(id: number, updateBucketDto: UpdateBucketDto) {
    return `This action updates a #${id} bucket`;
  }

  remove(id: number) {
    return `This action removes a #${id} bucket`;
  }
}

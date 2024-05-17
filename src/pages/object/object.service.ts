import { Injectable } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { GreenFieldService } from '../greenfield/greenfield.service';
import {
  Long,
  RedundancyType,
  bytesFromBase64,
} from '@bnb-chain/greenfield-js-sdk';
import { ReedSolomon } from '@bnb-chain/reed-solomon';
import { ConfigService } from '@nestjs/config';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class ObjectService {
  constructor(
    private gnfd: GreenFieldService,
    private readonly configService: ConfigService,
  ) {}

  async create(createObjectDto: CreateObjectDto) {
    const { blob, visibility, objectName, bucketName } = createObjectDto;

    const rs = new ReedSolomon();
    const fileBytes = await blob.arrayBuffer();
    const expectCheckSums = rs.encode(new Uint8Array(fileBytes));
    const createObjTx = await this.gnfd.client.object.createObject({
      bucketName: bucketName,
      objectName: objectName.toLowerCase(),
      creator: this.configService.get('ADMIN_WALLET'),
      visibility: visibility,
      contentType: blob.type,
      redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
      payloadSize: Long.fromInt(fileBytes.byteLength),
      expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x)),
    });

    const simulateInfo = await createObjTx.simulate({
      denom: 'BNB',
    });

    const res = await createObjTx.broadcast({
      denom: 'BNB',
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || '5000000000',
      payer: this.configService.get('ADMIN_WALLET'),
      granter: '',
      privateKey: this.configService.get('ADMIN_KEY'),
    });

    return res;
  }

  async upload(
    bucketName: string,
    objectName: string,
    txnHash: string,
    file: any,
  ) {
    const uploadRes = await this.gnfd.client.object.uploadObject(
      {
        bucketName: bucketName,
        objectName: objectName.toLowerCase(),
        body: file,
        txnHash: txnHash,
      },
      {
        type: 'ECDSA',
        privateKey: this.configService.get('ADMIN_KEY'),
      },
    );
    return uploadRes;
  }

  async creatFolder(payload: CreateFolderDto) {
    const { bucketName, folderName, visibility } = payload;
    const tx = await this.gnfd.client.object.createFolder({
      bucketName: bucketName,
      objectName: `${folderName}/`.toLowerCase(),
      creator: this.configService.get('ADMIN_WALLET'),
      redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
      visibility: visibility,
    });
    const simulateInfo = await tx.simulate({
      denom: 'BNB',
    });

    const res = await tx.broadcast({
      denom: 'BNB',
      gasLimit: Number(simulateInfo?.gasLimit),
      gasPrice: simulateInfo?.gasPrice || '5000000000',
      payer: this.configService.get('ADMIN_WALLET'),
      granter: '',
      privateKey: this.configService.get('ADMIN_KEY'),
    });

    return res;
  }
}

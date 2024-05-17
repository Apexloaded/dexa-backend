import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';

export class CreateObjectDto {
  bucketName: string;
  objectName: string;
  blob: Blob;
  visibility: VisibilityType;
}

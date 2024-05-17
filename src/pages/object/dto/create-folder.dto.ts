import { VisibilityType } from '@bnb-chain/greenfield-js-sdk';

export class CreateFolderDto {
  bucketName: string;
  folderName: string;
  visibility: VisibilityType;
}

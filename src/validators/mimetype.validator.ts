import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';

export interface TypeValidatorOptions {
  fileType: string[];
}

export class FileTypeValidator extends FileValidator {
  private _allowedMimeTypes: string[];

  constructor(protected readonly validationOptions: TypeValidatorOptions) {
    super(validationOptions);
    this._allowedMimeTypes = this.validationOptions.fileType;
  }

  public isValid(file?: Express.Multer.File): boolean {
    const response = fileType.parse(file.buffer);
    return (
      this._allowedMimeTypes.includes(response?.mime) ||
      this._allowedMimeTypes.includes(file.mimetype)
    );
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
      ', ',
    )}`;
  }
}

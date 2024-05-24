export class FileUploaded {
  file: Express.Multer.File;
  fileName: string;
  mimetype: string;
  path: string;
  creator: string;
}

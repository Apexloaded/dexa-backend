export class CreatePostEvent {
  file: Express.Multer.File;
  fileName: string;
  visibility: string;
}

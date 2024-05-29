import { IsEnum, IsString } from 'class-validator';
import { IngressInput } from 'src/enums/ingressInput.enum';

export class CreateStreamDto {
  @IsString()
  username: string;

  @IsEnum(IngressInput)
  ingressType: IngressInput;
}

export class CreateViewerTokenDto {
  @IsString()
  hostIdentity: string;

  @IsString()
  username: string;
}

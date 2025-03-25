import { IsNotEmpty, IsString } from 'class-validator';

export class validateTokenDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}

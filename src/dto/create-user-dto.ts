import { isNotEmpty, isString, IsString } from 'class-validator';

export class createUserDTO {
  @IsString()
  @isNotEmpty()
  fistName: string;

  @isString()
  @isNotEmpty()
  lastName: string;

  @isString()
  @isNotEmpty()
  email: string;

  @isString()
  @isNotEmpty()
  password: string;
}

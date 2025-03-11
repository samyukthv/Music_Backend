import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artist: string[];

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: string;
}

import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCriminalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsOptional()
  @IsString()
  placeOfBirth: string;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsString()
  colourOfEyes: string;

  @IsOptional()
  @IsString()
  colourOfHair: string;

  @IsOptional()
  @IsString()
  characteristics: string;

  @IsNotEmpty()
  @IsString()
  charges: string;
}

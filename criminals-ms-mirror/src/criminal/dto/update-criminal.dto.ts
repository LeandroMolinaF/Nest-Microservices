import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateCriminalDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  charges: string;
}

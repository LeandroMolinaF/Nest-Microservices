import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  mail: string;
}

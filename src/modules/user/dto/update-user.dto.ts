import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength, MaxLength } from 'class-validator';

class UpdateUserInfo {
  @IsString({ message: 'Username must be a string.' })
  @MinLength(4, { message: 'Username must be at least 4 characters long.' })
  @MaxLength(30, { message: 'Username must not exceed 30 characters.' })
  username: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(80, { message: 'Password must not exceed 80 characters.' })
  password: string;
}

export class UpdateUserDto extends PartialType(UpdateUserInfo) {}

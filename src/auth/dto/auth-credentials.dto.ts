import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString({ message: 'Username must be a string' })
  @MinLength(4, { message: 'Username is too short (4 characters min)' })
  @MaxLength(20, { message: 'Username is too long (20 characters max)' })
  username: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;
}

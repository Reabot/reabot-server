import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export default class CreateMessageDto {
  @IsString()
  @ApiProperty()
  roomId: string;

  @IsString()
  @MinLength(1, { message: 'Message to small (1 character min)' })
  @ApiProperty()
  message: string;
}

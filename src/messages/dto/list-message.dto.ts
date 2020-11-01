import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ListMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  roomId: string;
}

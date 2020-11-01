import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class DeleteRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  roomId: string;
}

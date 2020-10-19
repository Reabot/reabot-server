import { IsNotEmpty } from 'class-validator';

export class DeleteRoomDto {
  @IsNotEmpty()
  roomId: string;
}

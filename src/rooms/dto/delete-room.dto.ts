import { IsNotEmpty } from 'class-validator';

export default class DeleteRoomDto {
  @IsNotEmpty()
  roomId: string;
}

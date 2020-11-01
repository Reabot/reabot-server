import { IsNotEmpty } from 'class-validator';

export default class ListMessageDto {
  @IsNotEmpty()
  roomId: string;
}

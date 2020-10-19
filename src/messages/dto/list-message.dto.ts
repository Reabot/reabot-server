import { IsNotEmpty } from 'class-validator';

export class ListMessageDto {
  @IsNotEmpty()
  roomId: string;
}

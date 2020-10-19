import { IsNotEmpty, MinLength } from 'class-validator';

export class ListMessageDto {
  @IsNotEmpty()
  roomId: string;
}

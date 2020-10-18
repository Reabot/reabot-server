import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  message: string;
}

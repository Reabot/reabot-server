import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessagesService } from './messages.service';

import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Req() req): Promise<any> {
    return this.messagesService.getListOfMessages(req.query.roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body(ValidationPipe) createMessageDto: CreateMessageDto,
    @Req() req,
  ): Promise<any> {
    return this.messagesService.createMessage(createMessageDto, req.user);
  }
}

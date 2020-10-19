import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  ValidationPipe,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessagesService } from './messages.service';

import { CreateMessageDto } from './dto/create-message.dto';
import { ListMessageDto } from './dto/list-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(
    @Query(ValidationPipe) listMessageDto: ListMessageDto,
  ): Promise<any> {
    return this.messagesService.getListOfMessages(listMessageDto.roomId);
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

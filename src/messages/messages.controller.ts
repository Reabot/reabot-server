import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async list(@Req() req): Promise<object> {
    return this.messagesService.getListOfMessages(req.roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body): Promise<any> {
    return this.messagesService.createMessage(body);
  }
}

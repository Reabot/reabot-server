import { Controller, Get, Req, Post, Body, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get('list')
  async list() {
    return this.roomsService.getListRooms();
  }

  @UseGuards(JwtAuthGuard)
  @Get('userList')
  async userList(@Req() req): Promise<any> {
    return this.roomsService.getUserListRooms(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() room, @Req() req): Promise<any> {
    return this.roomsService.createRoom(room, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('join')
  async join(@Body() room, @Req() req): Promise<any> {
    return this.roomsService.joinRoom(room, req.user);
  }
}

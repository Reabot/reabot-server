import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  UseGuards,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { DeleteRoomDto } from './dto/delete-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
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
  @Delete('delete')
  async delete(
    @Body(ValidationPipe) deleteRoomDto: DeleteRoomDto,
  ): Promise<any> {
    // this.roomsService.deleteAllMessagesByRoomId(deleteRoomDto.roomId);
    return this.roomsService.deleteRoom(deleteRoomDto);
  }
}

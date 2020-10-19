import {
  Controller,
  Request,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    return this.authService.login(authCredentialsDto);
  }

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<any> {
    return this.authService.signUp(authCredentialsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req): Promise<any> {
    return req.user;
  }
}

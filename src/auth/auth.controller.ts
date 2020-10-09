import {
  Controller,
  Request,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<object> {
    return this.authService.signUp(authCredentialsDto);
  }
}

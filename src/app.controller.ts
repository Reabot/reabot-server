import { Controller, Get } from '@nestjs/common';

@Controller()
export default class AppController {
  @Get()
  getHello(): string {
    return "Welcome to the Reabot's API !";
  }
}

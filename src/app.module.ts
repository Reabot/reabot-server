import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

import { UsersModule } from './users/users.module';

import { RoomsController } from './rooms/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AuthModule,
    UsersModule,
    RoomsModule,
  ],
  controllers: [AppController, AuthController, RoomsController],
  providers: [AppService],
})
export class AppModule {}

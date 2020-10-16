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
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin&replicaSet=atlas-faqib4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    ),
    AuthModule,
    UsersModule,
    RoomsModule,
    MessagesModule,
  ],
  controllers: [AppController, AuthController, RoomsController],
  providers: [AppService],
})
export class AppModule {}

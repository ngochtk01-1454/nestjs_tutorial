import { Module } from '@nestjs/common';
import { UsersService } from './v1/users.service';
import { UsersController } from './v1/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

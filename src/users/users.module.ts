import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './v1/users.service';
import { UsersController } from './v1/users.controller';
import { User } from './entities/user.entity';
import { IsEmailUniqueValidator } from 'src/common/validators/is-email-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, IsEmailUniqueValidator],
  exports: [UsersService], // Export so auth module can use it
})
export class UsersModule {}

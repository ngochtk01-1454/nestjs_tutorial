import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import { CreateUserRequestDto } from '../dto/create-user-request.dto';
import { I18nService } from 'nestjs-i18n';
import { UserMapper } from '../mappers/user.mapper';
import { CurrentUserResponseDto } from 'src/auth/dto/current-user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private i18nService: I18nService
  ) {}

  findByEmail(email: string): Promise<User | null>{
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const newUser = { ...createUserDto, name: createUserDto.username, password: await bcrypt.hash(createUserDto.password, 10) };
    const user = this.usersRepository.create(newUser);
    const userCreated = await this.usersRepository.save(user);

    return {
      id: userCreated.id,
    };
  }

  async findById(id: number): Promise<CurrentUserResponseDto> {
    const userEntity = await this.usersRepository.findOne({ where: { id } });

    if (!userEntity) {
      throw new NotFoundException(this.i18nService.t('error.not_found'));
    }

    return {
      user: UserMapper.toUserResponse(userEntity)
    };
  }
}

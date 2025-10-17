import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/v1/users.service';
import { LoginResponseDto } from '../dto/login-response.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private i18nService: I18nService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }
    throw new UnauthorizedException(this.i18nService.t('error.unauthorized'));
  }

  async login(user: any): Promise<LoginResponseDto> {
    const payload = { email: user.email, userId: user.id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}

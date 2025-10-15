import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ApiCommonErrors, ApiSuccessResponse } from '../../common/decorators/api-responses.decorator';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorators';

@ApiTags('Authentication')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Login successful11')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with email and password to get JWT access token',
  })
  @ApiSuccessResponse(LoginResponseDto)
  @ApiCommonErrors()
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    const access_token = await this.authService.login(user);

    // create login response dto
    const loginResponseDto: LoginResponseDto = {
      access_token,
    };

    return loginResponseDto;
  }
}

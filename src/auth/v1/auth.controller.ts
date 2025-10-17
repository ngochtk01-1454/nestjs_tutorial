import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ApiCommonErrors, ApiSuccessResponse } from '../../common/decorators/api-responses.decorator';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Login successfully')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with email and password to get JWT access token',
  })
  @ApiSuccessResponse(LoginResponseDto)
  @ApiCommonErrors()
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    
    return this.authService.login(user);
  }
}

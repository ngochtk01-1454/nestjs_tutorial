import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { CurrentUserResponseDto } from '../dto/current-user-response.dto';
import { ApiCommonErrors, ApiSuccessResponse } from '../../common/decorators/api-responses.decorator';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorators';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UsersService } from 'src/users/v1/users.service';
import { UserMapper } from 'src/users/mappers/user.mapper';
import { I18nService } from 'nestjs-i18n';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

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

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get current user',
    description: 'Retrieve information about the currently authenticated user',
  })
  @ApiSuccessResponse(CurrentUserResponseDto)
  @ApiCommonErrors()
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: any): Promise<CurrentUserResponseDto> {
    return this.userService.findById(user.userId);
  }
}

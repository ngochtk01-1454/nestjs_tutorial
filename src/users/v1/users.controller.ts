import { Controller, Post, Body, HttpStatus, HttpCode, Put, Param, UseGuards, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import { ApiCommonErrors, ApiSuccessResponse } from 'src/common/decorators/api-responses.decorator';
import { CreateUserRequestDto } from '../dto/create-user-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('User registered successfully')
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user',
  })
  @ApiSuccessResponse(CreateUserResponseDto)
  @ApiCommonErrors()
  create(@Body() createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('User updated successfully')
  @ApiOperation({
    summary: 'User update',
    description: 'Update user information',
  })
  @ApiSuccessResponse(UserResponseDto)
  @ApiCommonErrors()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'testuser' },
        password: { type: 'string', example: 'Aa@123456' },
        bio: { type: 'string', example: 'Software Developer' },
        avatar: { type: 'string', format: 'binary' },
      },
    },
  })
  update(@CurrentUser() user: any, @Body() updateUserDto: UpdateUserRequestDto, @UploadedFile() file: Multer.File): Promise<UserResponseDto> {
    return this.usersService.update(user.userId, updateUserDto, file.buffer);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve information about a user by their ID',
  })
  @ApiSuccessResponse(UserResponseDto)
  @ApiCommonErrors()
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number): Promise<UserResponseDto> {
    return this.usersService.get(id);
  }
}

import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import { ApiCommonErrors, ApiSuccessResponse } from 'src/common/decorators/api-responses.decorator';
import { CreateUserRequestDto } from '../dto/create-user-request.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user',
  })
  @ApiSuccessResponse(CreateUserResponseDto)
  @ApiCommonErrors()
  create(@Body() createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }
}

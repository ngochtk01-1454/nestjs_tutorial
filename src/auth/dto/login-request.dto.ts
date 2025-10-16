import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginRequestDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test.user@example.com',
    type: String,
  })
  @IsEmail({}, { message: i18nValidationMessage('validation.invalid') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.required') })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    type: String,
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.required') })
  password: string;
}

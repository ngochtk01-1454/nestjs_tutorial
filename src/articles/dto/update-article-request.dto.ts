import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { LENGTH } from 'src/constants/length.constants';

export class UpdateArticleRequestDto {
  @ApiProperty({
    description: 'Article title',
    example: 'How to build a NestJS application',
    type: String,
  })
  @IsOptional()
  @MaxLength(LENGTH.MAX_DEFAULT, { message: i18nValidationMessage('validation.maxLength') })
  title?: string;

  @ApiProperty({
    description: 'Article description',
    example: 'A comprehensive guide to building modern web applications with NestJS',
    type: String,
  })
  @IsOptional()
  @MaxLength(LENGTH.MAX_DEFAULT, { message: i18nValidationMessage('validation.maxLength') })
  description?: string;

  @ApiProperty({
    description: 'Article body content',
    example: 'In this article, we will explore how to build a modern web application using NestJS framework...',
    type: String,
  })
  @IsOptional()
  body?: string;
}

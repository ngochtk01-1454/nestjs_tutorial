import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { LENGTH } from 'src/constants/length.constants';

export class CreateCommentBodyDto {
  @ApiProperty({
    description: 'Comment body content',
    example: 'His name was my name too.',
    maxLength: 1000,
  })
  @IsNotEmpty()
  @MaxLength(LENGTH.COMMENT, { message: i18nValidationMessage('validation.maxLength') })
  body: string;
}

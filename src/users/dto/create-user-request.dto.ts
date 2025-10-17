import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { IsEmailUnique } from "src/common/decorators/is-email-unique.decorator";
import { LENGTH, MIN_LENGTH } from "src/constants/length.constants";

export class CreateUserRequestDto {
    @ApiProperty({
        description: 'User email address',
        example: 'test.user@example.com',
        type: String,
    })
    @IsEmail({}, { message: i18nValidationMessage('validation.invalid') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.required') })
    @MaxLength(LENGTH.MAX_DEFAULT, { message: i18nValidationMessage('validation.maxLength') })
    @IsEmailUnique({ message: i18nValidationMessage('validation.email_taken') })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'Aa@123456',
        type: String,
    })
    @IsNotEmpty({ message: i18nValidationMessage('validation.required') })
    @MinLength(MIN_LENGTH.PASSWORD, { message: i18nValidationMessage('validation.minLength') })
    @IsStrongPassword({}, { message: i18nValidationMessage('validation.invalid') })
    password: string;
    @ApiProperty({
        description: 'Username',
        example: 'testuser',
        type: String,
    })

    @ApiProperty({
        description: 'User name',
        example: 'John Doe',
        type: String,
    })
    @IsNotEmpty({ message: i18nValidationMessage('validation.required') })
    @MaxLength(LENGTH.MAX_DEFAULT, { message: i18nValidationMessage('validation.maxLength') })
    username: string;
}

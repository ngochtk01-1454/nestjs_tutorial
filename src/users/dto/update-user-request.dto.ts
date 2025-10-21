import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { LENGTH, MIN_LENGTH } from "src/constants/length.constants";

export class UpdateUserRequestDto {
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
    @IsNotEmpty({ message: i18nValidationMessage('validation.required') })
    @MaxLength(LENGTH.MAX_DEFAULT, { message: i18nValidationMessage('validation.maxLength') })
    username: string;

    @ApiProperty({
        description: 'User bio',
        example: 'Software Developer',
        type: String,
        required: false,
    })
    @MaxLength(LENGTH.BIO, { message: i18nValidationMessage('validation.maxLength') })
    bio?: string;
}

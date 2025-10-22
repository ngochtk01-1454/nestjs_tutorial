import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString, Min, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { PAGINATION } from 'src/constants/api.constants';

export class GetArticlesQueryDto {
  @ApiProperty({
    description: 'Filter by tag name',
    example: 'AngularJS',
    required: false,
  })
  @IsOptional()
  tag?: string;

  @ApiProperty({
    description: 'Filter by author username',
    example: 'jake',
    required: false,
  })
  @IsOptional()
  author?: string;

  @ApiProperty({
    description: 'Filter by favorited by user login',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  favorited?: boolean;

  @ApiProperty({
    description: 'Limit number of articles (default is 20)',
    example: 20,
    required: false,
    default: 20,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  limit?: number = PAGINATION.LIMIT;

  @ApiProperty({
    description: 'Offset/skip number of articles (default is 0)',
    example: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  offset?: number = PAGINATION.OFFSET;
}

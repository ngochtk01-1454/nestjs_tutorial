import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';

export class CommentResponseDto {
  @ApiProperty({
    description: 'Comment data',
    type: CommentDto,
  })
  comment: CommentDto;
}

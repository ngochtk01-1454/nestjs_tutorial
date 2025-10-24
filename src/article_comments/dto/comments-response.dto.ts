import { ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';

export class CommentsResponseDto {
  @ApiProperty({
    description: 'Array of comments',
    type: [CommentDto],
  })
  comments: CommentDto[];
}

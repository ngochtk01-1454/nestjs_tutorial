import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";
import { AuthorDto } from "src/articles/dto/author.dto";

export class CommentDto {
  @ApiProperty({
    description: 'Comment ID',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Comment creation date',
    example: '2016-02-18T03:22:56.637Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Comment last update date',
    example: '2016-02-18T03:22:56.637Z',
  })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'Comment body content',
    example: 'It takes a Jacobian',
  })
  @Expose()
  body: string;

  @ApiProperty({
    description: 'Comment author information',
    type: AuthorDto,
  })
  @Expose()
  @Type(() => AuthorDto)
  @Transform(({ obj }) => {
    if (!obj.user) return null;
    return {
        username: obj.user.name,
        bio: obj.user.bio || '',
        image: obj.user.avatar ? obj.user.avatar.toString('base64') : null,
        following: false // TODO: Implement following logic
    };
  })
  author: AuthorDto;
}

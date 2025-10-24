import { ApiProperty } from "@nestjs/swagger";
import { CreateCommentBodyDto } from "./create-comment-body.dto";
import { Type } from "class-transformer";
import { ValidateNested, IsNotEmpty } from "class-validator";

export class CreateCommentRequestDto {
  @ApiProperty({
    description: 'Comment data',
    type: CreateCommentBodyDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCommentBodyDto)
  comment: CreateCommentBodyDto;
}

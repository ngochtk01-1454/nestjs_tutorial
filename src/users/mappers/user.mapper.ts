import { UserResponseDto } from '../dto/user-response.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toUserResponse(user: User): UserResponseDto {
    return {
      email: user.email,
      username: user.name,
      bio: user.bio || null,
      image: null, // TODO: Convert Buffer to URL if avatar exists
    };
  }
}

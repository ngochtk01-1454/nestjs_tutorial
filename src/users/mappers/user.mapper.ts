import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toUserResponse(user: User): UserDto {
    return {
      email: user.email,
      username: user.name,
      bio: user.bio || null,
      image: user.avatar ? user.avatar.toString('base64') : null,
    };
  }
}

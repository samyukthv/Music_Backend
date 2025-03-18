import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { LoginDTO } from 'src/dto/login-dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDTO);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Password does not match');
    }

    if (passwordMatched) {
      delete (user as Partial<User>).password;
      return user as User;
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}

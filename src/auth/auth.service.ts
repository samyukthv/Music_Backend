import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { LoginDTO } from 'src/dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
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
      const payload = { email: user.email, id: user.id };
      return { accessToken: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}

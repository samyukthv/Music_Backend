import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user-dto';
import { LoginDTO } from 'src/dto/login-dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<User> {
    return this.authService.login(loginDTO);
  }
}

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/create-user-dto';
import { LoginDTO } from 'src/dto/login-dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { Enable2FAType } from './types';

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
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(
    @Request()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user, '>>>>req.user');
    return this.authService.enable2FA(req.user.userId);
  }
}

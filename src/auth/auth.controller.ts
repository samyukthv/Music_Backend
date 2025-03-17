import { Body, Controller, Post } from '@nestjs/common';
import { createUserDTO } from 'src/dto/create-user-dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signup(@Body() userDTO: createUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }
}

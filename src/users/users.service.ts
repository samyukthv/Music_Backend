import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepo.save(userDTO);
    delete (user as Partial<User>).password;
    return user;
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) throw new UnauthorizedException('could not find user');
    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/login-dto';

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

  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) throw new UnauthorizedException('could not find user');
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id: id });
  }

  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.userRepo.update(
      { id: userId },
      { twoFASecret: secret, enable2FA: true },
    );
  }

  disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepo.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }
}

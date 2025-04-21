import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from 'src/dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/login-dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid4();
    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(userDTO.password, salt);
    const savedUser = await this.userRepo.save(user);
    delete (savedUser as Partial<User>).password;
    return savedUser;
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

  async findByApiKey(apiKey: string): Promise<User | null> {
    return this.userRepo.findOneBy({ apiKey });
  }
}

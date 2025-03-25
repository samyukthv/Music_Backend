import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { LoginDTO } from 'src/dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, payload } from './types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistservice: ArtistsService,
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
      const payload: payload = { email: user.email, id: user.id };
      const artist = await this.artistservice.findArtists(user.id);
      if (artist) payload.artistId = artist.id;
      return { accessToken: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    if (user.enable2FA) return { secret: user.twoFASecret };
    const secret = speakeasy.generateSecret();
    console.log(secret, 'secret');
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async validate2FA(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.userService.findById(userId);

      const verified = speakeasy.totp.verify({
        secret: user?.twoFASecret || '',
        token: token,
        encoding: 'base32',
      });

      if (verified) return { verified: true };
      else return { verified: false };
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new UnauthorizedException('Error verifying token', err);
    }
  }

  disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }
}

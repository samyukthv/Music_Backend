import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JWTStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { ArtistsModule } from 'src/artists/artists.module';
import { ApiKeyStrategy } from './ApiKeyStrategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ArtistsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, JWTStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

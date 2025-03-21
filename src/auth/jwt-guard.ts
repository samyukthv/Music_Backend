import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// The @Injectable() decorator in NestJS is used to mark a class as a provider,
//  meaning it can be injected into other classes using dependency injection.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

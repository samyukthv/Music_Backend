import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

Injectable();
export class artistJwtGuard extends AuthGuard('jwt') {}

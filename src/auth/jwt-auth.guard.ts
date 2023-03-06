import { ExecutionContext, Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private jwtService: JwtService) {
    super({
      passReqToCallback: true,
    });
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler());
    const jwtExtractFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    const authToken = jwtExtractFromRequest(request);

    if (allowUnauthorizedRequest && authToken) {
      const decodedToken = this.jwtService.decode(authToken);

      if (decodedToken['exp'] < Date.now() / 1000) {
        // don't allow request with expired token
        return false;
      }

      request.user = { id: decodedToken['id'], username: decodedToken['username'] };
    }

    return allowUnauthorizedRequest || super.canActivate(context);
  }
}

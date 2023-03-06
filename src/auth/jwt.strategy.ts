import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET, AUTH_HEADER } from 'src/config.defaults';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET', JWT_SECRET);
    const jwt_header = configService.get<string>('AUTH_HEADER', AUTH_HEADER).toLowerCase();

    super({
      jwtFromRequest: ExtractJwt.fromHeader(jwt_header),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}

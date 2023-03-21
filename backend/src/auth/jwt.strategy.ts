import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Employee } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtContants } from './jwtconstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtContants.secret
    });
  }

  async validate(payload: Employee) {
    return {id: payload.id, registration: payload.registration };
  }
}

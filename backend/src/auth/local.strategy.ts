import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'registration' });
  }

  async validate(regstration: string, password: string): Promise<any> {
    const employee = await this.authService.loginAuth(regstration, password);
    if(!employee)
      throw new UnauthorizedException();

    return employee;
  }
}

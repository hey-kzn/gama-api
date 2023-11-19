import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      /// TODO CHANGE TO CONFIG FILE
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
    });
  }

  validate(@Req() request, payload: any) {
    return payload;
  }
}
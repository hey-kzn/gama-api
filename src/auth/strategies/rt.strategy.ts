import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      /// TODO CHANGE TO CONFIG FILE
      secretOrKey: process.env.JWT_REFRESH_CONST,
      passReqToCallback: true,
    });
  }

  validate(@Req() request: Request, payload: any) {
    const refreshToken = request.headers.authorization
      .replace('Bearer', '')
      .trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}

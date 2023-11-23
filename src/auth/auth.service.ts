import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Logique metier quand l'utilisateur s'enregistre
   * @returns JWT token
   */
  async register({ username, email, password }: RegisterDTO) {
    const hashPassword = await this.hashData(password);

    const newUser = await this.userService.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateHashedRT(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async updateHashedRT(userId: string, rt: string) {
    const hashedRT = await this.hashData(rt);
    await this.userService.updateRT(userId, hashedRT);
  }

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      // at
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_CONST,
          expiresIn: '15m',
        },
      ),
      // rt
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_ACESS_REFRESH,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}

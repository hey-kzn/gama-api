import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }

  register(dto: RegisterDTO) {
    const user = this.usersService.create({ where: { data: dto } });
  }
  login() {}
  logout() {}
  refreshTokens() {}
}

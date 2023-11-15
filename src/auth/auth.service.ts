import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  register(dto: AuthDTO) {
    const user = this.usersService.findOne();
  }
  login() {}
  logout() {}
  refreshTokens() {}
}

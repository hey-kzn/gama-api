import { Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }

  async register({ username, email, password }: RegisterDTO) {
    const hashPassword = await this.hashPassword(password);
    const user = this.usersRepository.create({
      username: username,
      email: email,
      password: hashPassword,
    });
  }
  login() {}
  logout() {}
  refreshTokens() {}
}

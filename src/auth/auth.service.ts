import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(dto: SignInDTO): Promise<undefined> {
    const { username, password } = dto;

    const user = await this.usersService.findOne({"username": username});

    if(!)
  }
}

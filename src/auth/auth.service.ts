import { ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Logique metier quand l'utilisateur s'enregistre
   * @returns JWT token
   */
  async register(data: RegisterDTO) {
    const hashPassword = await this.hashData(data.password);

    // Instancie l'user sans l'enregistrer en base
    const newUser = this.usersRepository.create({
      email: data.email,
      username: data.username,
      password: hashPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    const hashedRT = await this.hashData(tokens.refresh_token);

    await this.usersRepository.merge(newUser, { hashed_rt: hashedRT });
    await this.usersRepository.save(newUser);
    return tokens;
  }

  async login(dto: LoginDTO) {
    const user = await this.usersRepository.findOneBy({
      email: dto.email,
    });
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    const hashedRT = await this.hashData(tokens.refresh_token);
    await this.usersRepository.merge(user, {
      hashed_rt: hashedRT,
    });
    await this.usersRepository.save(user);

    return tokens;
  }

  async logout(userId: string) {
    await this.usersRepository.update(userId, { hashed_rt: null });
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new ForbiddenException('Access denied');

    const rtMatches = await bcrypt.compare(rt, user.hashed_rt);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    const hashedRT = await this.hashData(tokens.refresh_token);
    await this.usersRepository.merge(user, { hashed_rt: hashedRT });
    await this.usersRepository.save(user);

    return tokens;
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
          secret: process.env.JWT_REFRESH_CONST,
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

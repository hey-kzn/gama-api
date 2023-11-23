import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/register')
  async register(@Body() dto: RegisterDTO) {
    return await this.authService.register(dto);
  }

  @Post('/local/login')
  async login() {
    this.authService.login();
  }

  @Post('/logout')
  async logout() {
    this.authService.logout();
  }

  @Post('/refresh')
  async refreshTokens() {
    this.authService.refreshTokens();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/register')
  async register(@Body() dto: AuthDTO) {
    this.authService.register(dto);
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

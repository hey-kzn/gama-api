import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/register')
  async register(@Res() res: Response, @Body() dto: RegisterDTO) {
    const newUser = await this.authService.register(dto);

    return res.status(HttpStatus.CREATED).json({
      message: 'The user has been successfully created',
      data: newUser,
    });
  }

  /*@Post('/local/login')
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
  }*/
}

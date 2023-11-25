import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { Response } from 'express';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/register')
  async register(@Res() res: Response, @Body() dto: RegisterDTO) {
    const tokens = await this.authService.register(dto);

    return res.status(HttpStatus.CREATED).json({
      message: 'The user has been successfully created',
      data: tokens,
    });
  }

  @Post('/local/login')
  async login(@Res() res: Response, @Body() dto: LoginDTO) {
    const {} = await this.authService.login(dto);

    return res.status(HttpStatus.OK).json({
      message: 'The user has been successfully connected',
      data: 
    });
  }

  /*@Post('/logout')
  async logout() {
    this.authService.logout();
  }

  @Post('/refresh')
  async refreshTokens() {
    this.authService.refreshTokens();
  }*/
}

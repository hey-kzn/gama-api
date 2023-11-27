import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { Request, Response } from 'express';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

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
    const tokens = await this.authService.login(dto);

    return res.status(HttpStatus.OK).json({
      message: 'The user has been successfully connected',
      data: tokens,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    console.log(user);
    //await this.authService.logout(user.sub['sub']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  async refreshTokens() {
    return 'todo'; //this.authService.refreshTokens();
  }
}

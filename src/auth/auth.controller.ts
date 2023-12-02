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
import { RtGuard } from 'src/common/guards/rt.guard';
import { AtGuard } from 'src/common/guards/at.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';

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

  @UseGuards(AtGuard)
  @Post('/logout')
  async logout(@GetCurrentUser('sub') userId: string, @Res() res: Response) {
    await this.authService.logout(userId);

    return res.status(HttpStatus.OK).json({
      message: 'The user has been successfully disconnected',
    });
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const tokens = await this.authService.refreshTokens(
      user['sub'],
      user['refreshToken'],
    );

    return res.status(HttpStatus.OK).json({
      message: 'The refresh tokens has been succesfully refresh',
      data: tokens,
    });
  }
}

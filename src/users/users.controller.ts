import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param() id: string) {
    return await this.usersService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateUserDTO) {
    return await this.usersService.create(dto);
  }

  @Patch(':id')
  async update(@Param() id: string, @Body() dto: UpdateUserDTO) {
    return await this.usersService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return await this.usersService.delete(id);
  }
}

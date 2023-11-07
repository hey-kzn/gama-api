import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    return user;
  }

  async create(dto: CreateUserDTO): Promise<string> {
    await this.usersRepository.create(dto);
    return 'User created with success !';
  }

  async update(id: string, dto: UpdateUserDTO): Promise<string> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(
        `Can't delete the user with id ${id}, is not exist`,
      );
    }
    this.usersRepository.merge(existingUser, dto);
    return `User with the id ${id} was updated succes`;
  }

  async delete(id: string): Promise<string> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} was not found`);
    }
    this.usersRepository.remove(user);
    return `User with id ${id} was successfuly removed`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user-dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserAlreadyExistsException } from 'src/helper/exceptions/user-already-exists.exception';
import { UserNotExistsException } from 'src/helper/exceptions/user-not-exists.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(data): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email: data },
    });
  }

  async create(data: CreateUserDTO): Promise<User> {
    let user = await this.findOne(data.email);
    if (user) throw new UserAlreadyExistsException();

    // Instancier la nouvelle entité sans la sauvegarder
    user = await this.usersRepository.create(data);
    // Entité sauvegardé dans la base de donnée
    return await this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDTO): Promise<string> {
    const existingUser = await this.findOne(id);
    if (!existingUser) throw new UserNotExistsException();

    this.usersRepository.merge(existingUser, dto);
    return `User with the id ${id} was updated succes`;
  }

  async delete(id: string): Promise<string> {
    const user = await this.findOne(id);
    if (!user) throw new UserNotExistsException();

    this.usersRepository.remove(user);
    return `User with id ${id} was successfuly removed`;
  }

  async updateRT(id: string, rt: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with the id: ${id} dont exist`);
    }
    await this.usersRepository.merge(user, { hashed_rt: rt });
  }
}

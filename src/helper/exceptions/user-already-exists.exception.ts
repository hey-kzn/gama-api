import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('A user already exists', HttpStatus.CONFLICT);
  }
}

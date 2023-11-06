import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseCategories } from './entity/expense-categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseCategoriesService {
  constructor(
    @InjectRepository(ExpenseCategories)
    private expenseCategoriesReposity: Repository<ExpenseCategories>,
  ) {}

  async findAll() {
    return 'todo';
  }

  async findOne() {
    return 'todo';
  }

  async create() {
    return 'todo';
  }

  async delete() {
    return 'todo';
  }
}

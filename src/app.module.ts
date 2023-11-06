import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    ExpensesModule,
    AuthModule,
    IncomesModule,
    ExpenseCategoriesModule,
  ],
})
export class AppModule {}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expense_categories')
export class ExpenseCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 60 })
  name: string;
  @Column({ type: 'varchar', length: 160 })
  description: string;
}

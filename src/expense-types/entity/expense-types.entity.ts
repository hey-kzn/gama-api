import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expense_types')
export class ExpenseTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 60 })
  name: string;
}

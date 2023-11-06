import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('expenses')
export class Expenses {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // TODO RELATION USER
  // TODO RELATION PAYEMENT
  // TODO RELATION CATEGORIES
  @Column({ type: 'timestamp' })
  date: Date;
  @Column({ type: 'numeric' })
  amount: number;
}

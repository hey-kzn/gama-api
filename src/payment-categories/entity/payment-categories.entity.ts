import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_categories')
export class PaymentCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
}

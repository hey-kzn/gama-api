import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_categories')
export class PaymentCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: '120' })
  name: string;
}

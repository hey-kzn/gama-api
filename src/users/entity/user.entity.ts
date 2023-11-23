import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_USER_ID' })
  id: string;
  @Column({ type: 'varchar', length: 120 })
  username: string;
  @Column({ type: 'varchar', length: 120 })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTRAMP(6)',
  })
  created_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
  @Column({ type: 'varchar' })
  hashed_rt: string;
}

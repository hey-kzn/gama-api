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
    type: 'timestamp with time zone',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updated_at: string;

  @Column({ type: 'varchar', nullable: true })
  hashed_rt?: string;
}

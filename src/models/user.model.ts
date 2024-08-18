import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface User {
    id?: string;
    username: string;
    password: string;
}
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken?: string;
}
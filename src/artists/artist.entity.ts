import { User } from 'src/users/users.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @PrimaryGeneratedColumn()
  id: number;
}

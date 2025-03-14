import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class Artist {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];

  @PrimaryGeneratedColumn()
  id: number;
}

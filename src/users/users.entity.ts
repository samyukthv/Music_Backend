import { Exclude } from 'class-transformer';
// import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User {
  @Column({ unique: true })
  email: string;
  @Column()
  @Exclude()
  password: string;
}

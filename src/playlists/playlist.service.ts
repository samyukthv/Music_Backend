import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/users.entity';
import { CreatePlayListDto } from 'src/dto/create-playlist-dto';

@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(Playlist) private playListRepo: Repository<Playlist>,
    @InjectRepository(Song) private songsRepo: Repository<Song>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;

    const songs = await this.songsRepo.findByIds(playListDTO.songs);
    playList.songs = songs;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.userRepo.findOneBy({ id: playListDTO.user });
    if (!user) throw new Error('User not found');
    playList.user = user;

    return this.playListRepo.save(playList);
  }
}

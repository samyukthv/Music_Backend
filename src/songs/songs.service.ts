import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from 'src/dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';

export interface SongType {
  title: string;
  artist: string[];
  releaseDate: string;
  duration: string;
}

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
  ) {}

  create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artist;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releaseDate = songDTO.releaseDate;
console.log(song,">>>song");

    return this.songsRepository.save(song);
  }

  findAll() {}
}

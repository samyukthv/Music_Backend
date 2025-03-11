import { Injectable, Scope } from '@nestjs/common';

export interface Song {
  title: string;
  artist: string[];
  releaseDate: string;
  duration: string;
}

@Injectable({
  scope: Scope.REQUEST,
})
export class SongsService {
  // Local database (array)
  private readonly songs: Song[] = [];

  create(song: Song) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // throw new Error('e');
    return this.songs;
  }
}

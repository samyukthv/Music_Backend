import { Body, Controller, Post } from '@nestjs/common';
import { PlayListsService } from './playlist.service';
import { CreatePlayListDto } from 'src/dto/create-playlist-dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}

  @Post()
  create(@Body() playlistDTO: CreatePlayListDto): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}

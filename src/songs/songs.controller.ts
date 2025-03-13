import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  // Inject,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from 'src/dto/create-song-dto';
// import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    // @Inject('CONNECTION') private connection: Connection,
  ) {
    // console.log(`this is connections log ${this.connection.CONNECTION_STRING}`);
    // If there is no private variable in the above line, you can avoid this log.
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (error) {
      throw new HttpException('server error', HttpStatus.FORBIDDEN, {
        cause: error,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `Find one song ${typeof id}`;
  }

  // Create song
  @Post()
  create(@Body() creatSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(creatSongDTO);
  }

  @Put(':id')
  update() {
    return 'Update a song';
  }

  @Delete(':id')
  delete() {
    return 'Delete a song';
  }
}

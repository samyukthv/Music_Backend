import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  // HttpException,
  // HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  UseGuards,
  Request,
  // Inject,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from 'src/dto/create-song-dto';
// import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from 'src/dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { artistJwtGuard } from 'src/artists/artists-jwt-guard';

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
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;

    return this.songsService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Song | null> {
    return this.songsService.findOne(id);
  }

  // Create song
  @Post()
  @UseGuards(artistJwtGuard)
  create(@Body() creatSongDTO: CreateSongDTO, @Request() req): Promise<Song> {
    return this.songsService.create(creatSongDTO);
  }

  // Update song
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}

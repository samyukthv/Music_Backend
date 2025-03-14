import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
// import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';

// testing different kinds of provider

// const mockSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'mock song' }];
//   },
// };

// @Module({
//   imports: [TypeOrmModule.forFeature([Song])],
//   controllers: [SongsController],
//   providers: [SongsService],
//   // providers: [
//   //   {
//   //     provide: SongsService,
//   //     useClass: SongsService,
//   //   },
//   // ],

//   // providers: [
//   //   SongsService,
//   //   {
//   //     provide: SongsService,
//   //     useValue: mockSongsService,
//   //   },
//   // ],

//   //non class based providers
//   // providers: [
//   //   SongsService,
//   //   {
//   //     provide: 'CONNECTION',
//   //     useValue: connection,
//   //   },
//   // ],
// })

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}

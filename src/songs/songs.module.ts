import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

// const mockSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'mock song' }];
//   },
// };

@Module({
  controllers: [SongsController],
  // providers: [
  //   {
  //     provide: SongsService,
  //     useClass: SongsService,
  //   },
  // ],

  // providers: [
  //   SongsService,
  //   {
  //     provide: SongsService,
  //     useValue: mockSongsService,
  //   },
  // ],

  //non class based providers
  providers: [
    SongsService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}

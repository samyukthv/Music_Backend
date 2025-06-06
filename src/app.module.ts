import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DevConfigService } from './common/providers/devConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { Song } from './songs/song.entity';
// import { User } from './users/users.entity';
// import { Artist } from './artists/artist.entity';
import { AuthModule } from './auth/auth.module';
// import { Playlist } from './playlists/playlist.entity';
import { PlayListModule } from './playlists/playlist.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { authConstants } from './auth/auth.constants';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('DB name', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs'); // option 1
    // consumer.apply(LoggerMiddleware).forRoutes({ path: 'songs', method: RequestMethod.POST }); // option 2
  }
}

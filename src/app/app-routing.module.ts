import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';
import { CabinetPageComponent } from './pages/cabinet-page/cabinet-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { GenresPageComponent } from './pages/genres-page/genres-page.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'artists',
    component: ArtistsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'artists/:artistId',
    component: ArtistPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'albums',
    component: AlbumsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'albums/:albumId',
    component: AlbumPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tracks',
    component: TracksPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cabinet',
    component: CabinetPageComponent,
    canActivate: [AuthGuard],
    data: {
      isPrivate: true,
    },
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard],
    data: {
      isPrivate: true,
    },
  },
  {
    path: 'playlists',
    component: PlaylistsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'playlists/:playlistId',
    component: PlaylistPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'genres',
    component: GenresPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'genres/:genreId',
    component: GenrePageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

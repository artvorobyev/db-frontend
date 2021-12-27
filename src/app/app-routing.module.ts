import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
  },
  {
    path: 'artists',
    component: ArtistsPageComponent,
  },
  {
    path: 'artists/:artistId',
    component: ArtistPageComponent,
  },
  {
    path: 'albums',
    component: AlbumsPageComponent,
  },
  {
    path: 'albums/:albumId',
    component: AlbumPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

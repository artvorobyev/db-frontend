import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { ArtistsPageComponent } from './pages/artists-page/artists-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ArtistCardComponent } from './shared/artist-card/artist-card.component';
import { ArtistHeaderComponent } from './shared/artist-header/artist-header.component';
import { ArtistPageComponent } from './pages/artist-page/artist-page.component';
import { RoundedImageComponent } from './shared/rounded-image/rounded-image.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlbumCardComponent } from './shared/album-card/album-card.component';
import { SquaredImageComponent } from './shared/squared-image/squared-image.component';
import { TrackCardComponent } from './shared/track-card/track-card.component';
import { ToastsComponent } from './layout/toasts/toasts.component';
import { AlbumPageComponent } from './pages/album-page/album-page.component';
import { AlbumHeaderComponent } from './shared/album-header/album-header.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { AlbumCardWithItemsComponent } from './shared/album-card-with-items/album-card-with-items.component';
import { TrackCardWithDetailsComponent } from './shared/track-card-with-details/track-card-with-details.component';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { LoginPopupComponent } from './layout/login-popup/login-popup.component';
import { CabinetPageComponent } from './pages/cabinet-page/cabinet-page.component';
import { SignupPopupComponent } from './layout/signup-popup/signup-popup.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ButtonComponent } from './shared/button/button.component';
import { CreatePlaylistPopupComponent } from './shared/create-playlist-popup/create-playlist-popup.component';
import { PlaylistCardComponent } from './shared/playlist-card/playlist-card.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { PlaylistsPageComponent } from './pages/playlists-page/playlists-page.component';
import { EditPlaylistPopupComponent } from './shared/edit-playlist-popup/edit-playlist-popup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GenresPageComponent } from './pages/genres-page/genres-page.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontPageComponent,
    HeaderComponent,
    LayoutComponent,
    ArtistsPageComponent,
    SpinnerComponent,
    ArtistCardComponent,
    ArtistHeaderComponent,
    ArtistPageComponent,
    RoundedImageComponent,
    AlbumCardComponent,
    SquaredImageComponent,
    TrackCardComponent,
    ToastsComponent,
    AlbumPageComponent,
    AlbumHeaderComponent,
    AlbumsPageComponent,
    AlbumCardWithItemsComponent,
    TrackCardWithDetailsComponent,
    TracksPageComponent,
    LoginPopupComponent,
    CabinetPageComponent,
    SignupPopupComponent,
    SettingsPageComponent,
    ButtonComponent,
    CreatePlaylistPopupComponent,
    PlaylistCardComponent,
    PlaylistPageComponent,
    PlaylistsPageComponent,
    EditPlaylistPopupComponent,
    GenresPageComponent,
    GenrePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginPopupComponent],
})
export class AppModule {}

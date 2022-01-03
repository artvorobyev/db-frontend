import { IArtist } from './artists.interfaces';
import { ITrack } from './tracks.interfaces';

export interface IAlbum {
  id: number;
  name: string;
  image_url: string;
  release_date: string;
}

export interface IAlbumWithArtists extends IAlbum {
  artists: IArtist[];
}

export interface IAlbumWithItems extends IAlbumWithArtists {
  tracks: ITrack[];
}

export interface IAlbumsSearchResponse {
  albums: IAlbumWithArtists[];
}

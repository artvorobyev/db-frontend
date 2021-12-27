import { IArtist } from './artists.interfaces';
import { ITrack } from './tracks.interfaces';

export interface IAlbum {
  id: number;
  name: string;
  image_url: string;
  release_date: string;
}

export interface IAlbumWithItems extends IAlbum {
  artists: IArtist[];
  tracks: ITrack[];
}

export interface IAlbumsSearchResponse {
  albums: IAlbumWithItems[];
}

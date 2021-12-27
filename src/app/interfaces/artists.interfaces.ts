import { IAlbum } from './albums.interfaces';
import { ITrack } from './tracks.interfaces';

export interface IArtistsSearchResponse {
  artists: IArtist[];
}

export interface IArtist {
  id: number;
  name: string;
  image_url: string;
}

export interface IArtistWithItems extends IArtist {
  albums: IAlbum[];
  tracks: ITrack[];
}

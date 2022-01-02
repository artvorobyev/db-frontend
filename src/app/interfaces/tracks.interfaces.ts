import { IAlbum } from './albums.interfaces';
import { IArtist } from './artists.interfaces';

export interface ITrack {
  name: string;
  file_url: string;
  id: number;
  album_id: number;
}

export interface ITrackWithDetails extends ITrack {
  artists: IArtist[];
  album: IAlbum;
}

export interface ITracksSearchResponse {
  tracks: ITrackWithDetails[];
}

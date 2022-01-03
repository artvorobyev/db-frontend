import { IAlbum } from './albums.interfaces';
import { IArtist } from './artists.interfaces';
import { ITrackReaction } from './reactions.intrefaces';

export interface ITrack {
  name: string;
  file_url: string;
  id: number;
  album_id: number;
  reaction?: ITrackReaction;
}

export interface ITrackWithDetails extends ITrack {
  artists: IArtist[];
  album: IAlbum;
}

export interface ITracksSearchResponse {
  tracks: ITrackWithDetails[];
}

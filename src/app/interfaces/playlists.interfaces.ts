import { IPlaylistReaction } from './reactions.intrefaces';
import { ITrackWithDetails } from './tracks.interfaces';

export interface IPlaylist {
  id: number;
  name: string;
  is_public: boolean;
  user_id: number;
  author_name: string;
  reaction: IPlaylistReaction;
  tracks: ITrackWithDetails[];
}

export interface ICreatePlaylistData {
  name: string;
  is_public: boolean;
}

export interface IAddTrackToPlaylistData {
  playlistId: number;
  trackId: number;
}

export interface IUpdatePlaylistData {
  name: string;
  is_public: boolean;
  tracks: number[];
}

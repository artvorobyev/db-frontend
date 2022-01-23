import { IPlaylist } from './playlists.interfaces';
import { ITrackWithDetails } from './tracks.interfaces';

export interface IUser {
  id: number;
  login: string;
  email: string;
  tracks: ITrackWithDetails[];
  playlists: IPlaylist[];
}

export interface IUserResponse {
  user: IUser;
}

export interface ICreateUserData {
  login: string;
  email: string;
  password: string;
}

export interface IUpdateUserData {
  email?: string;
  password: string;
  newPassword?: string;
}

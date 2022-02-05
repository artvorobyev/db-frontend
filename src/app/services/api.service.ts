import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAlbumsSearchResponse,
  IAlbumWithItems,
} from '../interfaces/albums.interfaces';
import { IResponse } from '../interfaces/api.interfaces';
import {
  IArtistsSearchResponse,
  IArtistWithItems,
} from '../interfaces/artists.interfaces';
import { ILoginParams } from '../interfaces/auth.interfaces';
import {
  IGenre,
  IGenreWithAlbums,
  IGetGenresResponse,
} from '../interfaces/genres.interfaces';
import {
  IAddTrackToPlaylistData,
  ICreatePlaylistData,
  IPlaylist,
  IUpdatePlaylistData,
} from '../interfaces/playlists.interfaces';
import {
  IPlaylistReaction,
  ITrackReaction,
} from '../interfaces/reactions.intrefaces';
import { ITracksSearchResponse } from '../interfaces/tracks.interfaces';
import {
  ICreateUserData,
  IUpdateUserData,
  IUser,
  IUserResponse,
} from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  host = 'http://backend.music.local';

  constructor(private httpClient: HttpClient) {}

  getArtists(query: string): Observable<IResponse<IArtistsSearchResponse>> {
    return this.get<IArtistsSearchResponse>('artists', {
      query: query,
    });
  }

  getArtist(artistId: number): Observable<IResponse<IArtistWithItems>> {
    return this.get<IArtistWithItems>(`artists/${artistId}`);
  }

  getAlbums(query: string): Observable<IResponse<IAlbumsSearchResponse>> {
    return this.get<IAlbumsSearchResponse>('albums', {
      query: query,
    });
  }

  getAlbum(albumId: number): Observable<IResponse<IAlbumWithItems>> {
    return this.get<IAlbumWithItems>(`albums/${albumId}`);
  }

  getTracks(query: string): Observable<IResponse<ITracksSearchResponse>> {
    return this.get<ITracksSearchResponse>('tracks', {
      query: query,
    });
  }

  login(params: ILoginParams): Observable<IResponse<{ message: string }>> {
    return this.post('login', { ...params });
  }

  logout(): Observable<IResponse<{ message: string }>> {
    return this.post('logout');
  }

  getCurrentUser(): Observable<IResponse<IUserResponse>> {
    return this.get<IUserResponse>('user');
  }

  createUser(
    data: ICreateUserData
  ): Observable<IResponse<{ message: string }>> {
    return this.post('user', { ...data });
  }

  updateUser(
    data: IUpdateUserData
  ): Observable<IResponse<{ message: string }>> {
    return this.put('user', { ...data });
  }

  createTrackReaction(
    data: ITrackReaction
  ): Observable<IResponse<{ message: string }>> {
    return this.post('track-reaction', { ...data });
  }

  deleteTrackReaction(
    trackId: number
  ): Observable<IResponse<{ message: string }>> {
    return this.delete('track-reaction', { track_id: trackId });
  }

  createPlaylistReaction(
    data: IPlaylistReaction
  ): Observable<IResponse<{ message: string }>> {
    return this.post('playlist-reaction', { ...data });
  }

  deletePlaylistReaction(
    playlistId: number
  ): Observable<IResponse<{ message: string }>> {
    return this.delete('playlist-reaction', { playlist_id: playlistId });
  }

  createPlaylist(data: ICreatePlaylistData): Observable<IResponse<IPlaylist>> {
    return this.post('playlists', { ...data });
  }

  addTrackToPlaylist(
    data: IAddTrackToPlaylistData
  ): Observable<IResponse<IPlaylist>> {
    return this.put(`playlists/${data.playlistId}/track`, {
      trackId: data.trackId,
    });
  }

  getPlaylist(playlistId: number): Observable<IResponse<IPlaylist>> {
    return this.get(`playlists/${playlistId}`);
  }

  getPlaylists(query: string): Observable<IResponse<IPlaylist[]>> {
    return this.get(`playlists`, {
      query,
    });
  }

  updatePlaylist(
    playlistId: number,
    data: IUpdatePlaylistData
  ): Observable<IResponse<IPlaylist>> {
    return this.put(`playlists/${playlistId}`, { ...data });
  }

  deletePlaylist(
    playlistId: number
  ): Observable<IResponse<{ message: string }>> {
    return this.delete(`playlists/${playlistId}`);
  }

  getGenres(): Observable<IResponse<IGetGenresResponse>> {
    return this.get('genres');
  }

  getGenre(genreId: number): Observable<IResponse<IGenreWithAlbums>> {
    return this.get(`genres/${genreId}`);
  }

  get<T>(
    endpoint: string,
    params?: { [key: string]: string | number | boolean }
  ): Observable<IResponse<T>> {
    return this.httpClient.get<IResponse<T>>(`${this.host}/${endpoint}`, {
      params,
      withCredentials: true,
      headers: new HttpHeaders(),
    });
  }

  private post<T>(
    endpoint: string,
    params?: { [key: string]: string | number | boolean | object }
  ): Observable<IResponse<T>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST');

    return this.httpClient.post<IResponse<T>>(
      `${this.host}/${endpoint}`,
      { ...params },
      {
        withCredentials: true,
        headers: headers,
      }
    );
  }

  private put<T>(
    endpoint: string,
    params?: { [key: string]: string | number | boolean | object }
  ): Observable<IResponse<T>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST');

    return this.httpClient.put<IResponse<T>>(
      `${this.host}/${endpoint}`,
      { ...params },
      {
        withCredentials: true,
        headers: headers,
      }
    );
  }

  private delete<T>(
    endpoint: string,
    params?: { [key: string]: string | number | boolean }
  ): Observable<IResponse<T>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST');

    return this.httpClient.delete<IResponse<T>>(`${this.host}/${endpoint}`, {
      withCredentials: true,
      headers: headers,
      params: params,
    });
  }
}

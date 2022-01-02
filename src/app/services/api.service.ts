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
import { ITracksSearchResponse } from '../interfaces/tracks.interfaces';
import { IUser, IUserResponse } from '../interfaces/user.interfaces';

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

  getCurrentUser(): Observable<IResponse<IUserResponse>> {
    return this.get<IUserResponse>('user');
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

  post<T>(
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
}

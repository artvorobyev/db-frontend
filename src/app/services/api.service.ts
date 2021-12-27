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

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  host = 'http://localhost:3001';

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

  get<T>(
    endpoint: string,
    params?: { [key: string]: string | number | boolean }
  ): Observable<IResponse<T>> {
    return this.httpClient.get<IResponse<T>>(`${this.host}/${endpoint}`, {
      params,
      // withCredentials: true,
      headers: new HttpHeaders(),
    });
  }
}

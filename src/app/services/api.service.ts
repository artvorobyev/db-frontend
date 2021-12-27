import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces/api.interfaces';
import { IArtistsSearchResponse } from '../interfaces/artists.interfaces';

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

  get<T>(
    endpoint: string,
    params: { [key: string]: string | number | boolean }
  ): Observable<IResponse<T>> {
    return this.httpClient.get<IResponse<T>>(`${this.host}/${endpoint}`, {
      params,
      // withCredentials: true,
      headers: new HttpHeaders(),
    });
  }
}

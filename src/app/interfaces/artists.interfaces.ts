export interface IArtistsSearchResponse {
  artists: IArtist[];
}

export interface IArtist {
  id: number;
  name: string;
  image_url: string;
}

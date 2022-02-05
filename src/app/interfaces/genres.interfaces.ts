import { IAlbumWithArtists } from './albums.interfaces';

export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreWithAlbums extends IGenre {
  albums: IAlbumWithArtists[];
}

export interface IGetGenresResponse {
  genres: IGenre[];
}

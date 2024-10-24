interface IGenrt {
  id: number;
  name: string;
}

export interface IFilme {
  adult: boolean;
  backdrop_path: string;
  genres: IGenrt[];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

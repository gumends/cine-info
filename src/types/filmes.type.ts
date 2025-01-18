interface IGenrt {
  id: number;
  name: string;
}

interface IReleaseDates {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      descriptors: {}[];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
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
  release_dates: IReleaseDates;
  title: string;
  runtime: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

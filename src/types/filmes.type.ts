interface IGenrt {
  id: number;
  name: string;
}

export interface IReleaseDates {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      descriptors: [];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
}

interface IProduction_companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface IProduction_countries {
  iso_3166_1: string;
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
  release_dates: IReleaseDates;
  production_companies: IProduction_companies[];
  production_countries: IProduction_countries[];
  title: string;
  runtime: number;
  homepage: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
  budget: number;
  revenue: number;
  origin_country: string;
}

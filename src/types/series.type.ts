interface IGenrt {
  id: number;
  name: string;
}

interface Ilast_episode_to_air {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface ISesson {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface IReleaseDate {
  certification?: string;
  release_date?: string;
}

export interface IReleaseDatesResult {
  iso_3166_1: string;
  release_dates: IReleaseDate[];
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

export interface ISerie {
  adult: boolean;
  backdrop_path: string;
  genres: IGenrt[];
  homepage: string;
  first_air_date: string;
  id: number;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: Ilast_episode_to_air;
  name: string;
  next_episode_to_air: Ilast_episode_to_air;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  tagline: string;
  runtime: number;
  budget: number;
  revenue: number;
  origin_country: string;
  production_companies: IProduction_companies[];
  production_countries: IProduction_countries[];
  sessons: ISesson[];
  release_date: string;
  // release_dates: IReleaseDates;
  vote_average: number;
  vote_count: number;
}

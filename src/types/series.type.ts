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
  sessons: ISesson[];
  release_date: string;
  // release_dates: IReleaseDates;
  vote_average: number;
  vote_count: number;
}

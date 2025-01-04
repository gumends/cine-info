export interface IPopular {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  original_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface PopularResponse {
  page: number;
  results: IPopular[];
  total_pages: number;
  total_results: number;
}



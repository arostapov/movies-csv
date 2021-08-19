import { Movie } from "./movie.model";

export interface Movies {
  Response: string;
  Search: Array<Movie>;
  totalResults: number;
}

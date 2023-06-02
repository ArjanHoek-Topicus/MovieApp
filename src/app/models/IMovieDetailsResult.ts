export interface IMovieDetailsResult {
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  poster_path: string;
  release_date: string;
  overview: string;
  budget: number;
  title: string;
  vote_average: number;
  image_path: string;
  tagline: string;
}

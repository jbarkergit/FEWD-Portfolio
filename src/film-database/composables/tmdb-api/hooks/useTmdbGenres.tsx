import { Type_MovieGenre_Keys, tmdbMovieGenres } from '../data/tmdbMovieGenres';

const map = (): string[] => {
  return [...Object.keys(tmdbMovieGenres)].sort().map((key) => key.replaceAll('_', ' '));
};

const genreId = (genre: Type_MovieGenre_Keys): number => {
  return tmdbMovieGenres[genre];
};

export const useTmdbGenres = () => {
  return { map, genreId };
};

import { Type_MovieGenre_Keys, tmdbMovieGenres } from '../data/tmdbMovieGenres';

const sortedMap = (): string[] => {
  return [...Object.keys(tmdbMovieGenres)].sort().map((key) => key.replaceAll('_', ' '));
};

const id = (genre: Type_MovieGenre_Keys): number => {
  return tmdbMovieGenres[genre];
};

export const useTmdbGenres = () => {
  return { sortedMap, id };
};

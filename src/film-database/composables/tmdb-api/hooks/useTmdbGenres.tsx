import { useMemo } from 'react';
import { Type_MovieGenre_Keys, tmdbMovieGenres } from '../data/tmdbMovieGenres';

export const useTmdbGenres = (): {
  sortedMap: string[];
  id: (genre: Type_MovieGenre_Keys) => number;
} => {
  const sortedMap = useMemo((): string[] => {
    return Object.keys(tmdbMovieGenres)
      .sort()
      .map((key) => key.replaceAll('_', ' '));
  }, [tmdbMovieGenres]);

  const id = (genre: Type_MovieGenre_Keys): number => {
    return tmdbMovieGenres[genre];
  };

  return { sortedMap, id };
};

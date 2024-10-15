import { useMemo } from 'react';

export type Type_MovieGenre_Keys =
  | 'action'
  | 'adventure'
  | 'animation'
  | 'comedy'
  | 'crime'
  | 'documentary'
  | 'drama'
  | 'family'
  | 'fantasy'
  | 'history'
  | 'horror'
  | 'music'
  | 'mystery'
  | 'romance'
  | 'science_fiction'
  | 'tv_movie'
  | 'thriller'
  | 'war'
  | 'western';

const tmdbMovieGenres: Record<Type_MovieGenre_Keys, number> = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  science_fiction: 878,
  tv_movie: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

export const useTmdbGenres = (): {
  tmdbMovieGenres: typeof tmdbMovieGenres;
  sortedGenreKeys: string[];
} => {
  const sortedGenreKeys = useMemo((): string[] => {
    return Object.keys(tmdbMovieGenres)
      .sort()
      .map((key) => key.replaceAll('_', ' '));
  }, [tmdbMovieGenres]);

  return { tmdbMovieGenres, sortedGenreKeys };
};

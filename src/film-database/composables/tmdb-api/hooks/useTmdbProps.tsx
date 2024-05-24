import { Type_Tmdb_Api_Union, Type_Tmdb_ApiMovieList_Obj, Type_Tmdb_ApiMovie_Obj } from '../types/TmdbDataTypes';

export const useTmdbProps = (obj: Type_Tmdb_Api_Union) => {
  switch (true) {
    case 'genre_ids' in obj:
      const movieList = obj as Type_Tmdb_ApiMovieList_Obj;
      return { heading: movieList.title, poster_path: movieList.poster_path, alt: movieList.title };

    case 'imdb_id' in obj:
      const movie = obj as Type_Tmdb_ApiMovie_Obj;
      const poster_path: string = movie.poster_path ? (movie.poster_path as string) : (movie.backdrop_path as string);
      return { heading: movie.title, poster_path: poster_path, alt: movie.title };

    case 'published_at' in obj:
      console.error('useTmdbProps does not accept trailers, please refer to useFetchTmdbTrailer.');
      break;

    default:
      console.error('Failure to reach object type_guard.');
      break;
  }
};

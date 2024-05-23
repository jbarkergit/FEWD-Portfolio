import { Type_Tmdb_Api_Union, Type_Tmdb_ApiMovieList_Obj, Type_Tmdb_ApiMovie_Obj } from '../types/TmdbDataTypes';

export const useTmdbProps = (obj: Type_Tmdb_Api_Union) => {
  switch (obj.type_guard) {
    case 'movielist':
      const movieList = obj as Type_Tmdb_ApiMovieList_Obj;
      return { heading: movieList.title, poster_path: movieList.poster_path, alt: movieList.title };

    case 'movie':
      const movie = obj as Type_Tmdb_ApiMovie_Obj;
      const poster_path: string = movie.poster_path ? (movie.poster_path as string) : (movie.backdrop_path as string);
      return { heading: movie.title, poster_path: poster_path, alt: movie.title };

    case 'trailer':
      console.error('useTmdbProps does not accept trailers, please refer to useFetchTmdbTrailer.');
      break;

    default:
      console.error('Failure to reach object type_guard.');
      break;
  }
};

import { Type_Tmdb_Api_Union, Type_Tmdb_ApiMovieList_Obj, Type_Tmdb_ApiMovie_Obj } from '../types/TmdbDataTypes';

export const useTmdbProps = (obj: Type_Tmdb_Api_Union) => {
  switch (true) {
    case 'genre_ids' in obj:
      const movieList = obj as Type_Tmdb_ApiMovieList_Obj;
      return {
        heading: movieList.title,
        overview: movieList.overview,
        vote_average: movieList.vote_average,
        poster_path: movieList.poster_path,
        backdrop_path: movieList.backdrop_path,
        alt: movieList.title,
        id: movieList.id,
      };

    case 'imdb_id' in obj:
      const movie = obj as Type_Tmdb_ApiMovie_Obj;
      const poster_path: string = movie.poster_path ? (movie.poster_path as string) : (movie.backdrop_path as string);
      return {
        heading: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        poster_path: poster_path,
        backdrop_path: movie.backdrop_path,
        alt: movie.title,
        id: movie.id,
      };

    case 'published_at' in obj:
      console.error('useTmdbProps does not accept trailers, please refer to useFetchTmdbTrailer.');
      break;

    default:
      console.error('Failure to reach object type_guard.');
      break;
  }
};

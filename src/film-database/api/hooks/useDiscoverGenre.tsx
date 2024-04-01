/** useDiscoverGenre types && interface */
type Type_TmdbDiscover_MediaType_Union = 'movie' | 'tv';

type Type_TmdbDiscoverMovie_Genre_Union =
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

type Type_TmdbDiscoverTv_Genre_Union =
  | 'action_adventure'
  | 'animation'
  | 'comedy'
  | 'crime'
  | 'documentary'
  | 'drama'
  | 'family'
  | 'kids'
  | 'mystery'
  | 'news'
  | 'reality'
  | 'sciFi_fantasy'
  | 'soap'
  | 'talk'
  | 'war_politics'
  | 'western';

interface Interface_Discover {
  type: Type_TmdbDiscover_MediaType_Union;
  genre: Type_TmdbDiscoverMovie_Genre_Union | Type_TmdbDiscoverTv_Genre_Union;
}

/** ID Storage */
const movieGenres: Record<Type_TmdbDiscoverMovie_Genre_Union, number> = {
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

const tvGenres: Record<Type_TmdbDiscoverTv_Genre_Union, number> = {
  action_adventure: 10759,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  kids: 10762,
  mystery: 9648,
  news: 10763,
  reality: 10764,
  sciFi_fantasy: 10765,
  soap: 10766,
  talk: 10767,
  war_politics: 10768,
  western: 37,
};

/** Hook */
export const useDiscoverGenre = ({ type, genre }: Interface_Discover): { type: string; genreNum: number } | undefined => {
  const payload: { type: string; genre: string } = { type: type.toLowerCase(), genre: genre.toLowerCase() };

  switch (payload.type) {
    case 'movie':
      return { type: payload.type, genreNum: movieGenres[payload.genre as Type_TmdbDiscoverMovie_Genre_Union] };
    case 'tv':
      return { type: payload.type, genreNum: tvGenres[payload.genre as Type_TmdbDiscoverTv_Genre_Union] };
    default:
      return undefined;
  }
};

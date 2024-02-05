/**
 https://developer.themoviedb.org/reference/
  { key: '', endPoint: `` },
  { key: '', endPoint: `` },
  { key: '', endPoint: `` },
  { key: '', endPoint: `` },
 */

const tmdbApiEndPoints = [
  {
    movieLists: [
      { key: 'nowPlaying', endPoint: 'https://api.themoviedb.org/3/movie/now_playing' },
      { key: 'popular', endPoint: 'https://api.themoviedb.org/3/movie/popular' },
      { key: 'topRated', endPoint: 'https://api.themoviedb.org/3/movie/top_rated' },
      { key: 'upcoming', endPoint: ' https://api.themoviedb.org/3/movie/upcoming' },
    ],
  },
  {
    movies: [
      { key: 'details', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}` },
      { key: 'alternativeTitles', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/alternative_titles` },
      { key: 'credits', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/credits` },
      { key: 'images', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/images` },
      { key: 'lists', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/lists` },
      { key: 'recommendations', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/recommendations` },
      { key: 'releaseDates', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/release_dates` },
      { key: 'reviews', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/reviews` },
      { key: 'similar', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/similar` },
      { key: 'videos', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/videos` },
      { key: 'watchProviders', endPoint: `https://api.themoviedb.org/3/movie/{movie_id}/watch/providers` },
    ],
  },
  {
    peopleLists: [{ key: 'popular', endPoint: `https://api.themoviedb.org/3/person/popular` }],
  },
  {
    people: [
      { key: 'details', endPoint: `https://api.themoviedb.org/3/person/{person_id}` },
      { key: 'combinedCredits', endPoint: `https://api.themoviedb.org/3/person/{person_id}/combined_credits` },
      { key: 'images', endPoint: `https://api.themoviedb.org/3/person/{person_id}/images` },
      { key: 'movieCredits', endPoint: `https://api.themoviedb.org/3/person/{person_id}/movie_credits` },
      { key: 'tvCredits', endPoint: `https://api.themoviedb.org/3/person/{person_id}/tv_credits` },
    ],
  },
  {
    search: [
      { key: 'movie', endPoint: `https://api.themoviedb.org/3/search/movie` },
      { key: 'person', endPoint: `https://api.themoviedb.org/3/search/person` },
      { key: 'tv', endPoint: `https://api.themoviedb.org/3/search/tv` },
    ],
  },
  {
    trending: [
      { key: 'movies', endPoint: `https://api.themoviedb.org/3/trending/movie/{time_window}` },
      { key: 'tv', endPoint: `https://api.themoviedb.org/3/trending/tv/{time_window}` },
    ],
  },
];

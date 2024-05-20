import { Type_Tmdb_ApiCall_Union } from '../types/TmdbDataTypes';

/** fetchTmdbResponse Utility Payload && Promise/Resolved Response Types */
type Type_fetchTmdbResponse_Payload = {
  endPoint_keyValuePair: [key: string, value: string];
  opt_movie_id?: number;
};

type Type_fetchTmdbResponse_Response_ResolvedPromise = {
  results: Type_Tmdb_ApiCall_Union[];
  page?: number;
  total_pages?: number;
  total_results?: number;
  dates?: { maximum: string; minimum: string };
};

type Type_fetchTmdbResponse_Response_Promise = Promise<Type_fetchTmdbResponse_Response_ResolvedPromise | undefined>;

/** Fetch endpoint responses */
export const fetchTmdbResponse = async ({ endPoint_keyValuePair, opt_movie_id }: Type_fetchTmdbResponse_Payload): Type_fetchTmdbResponse_Response_Promise => {
  /** TMDB Api Authorization with signal attached */
  const abortController = new AbortController();

  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
    signal: abortController.signal,
  };

  try {
    /** Construct our endpoint (replace endpoint placeholder with opt params (movie or tv ids)) */
    const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;
    let fetchUrl: string | undefined;

    switch (endPoint_keyValuePair[0]) {
      case 'now_playing':
      case 'upcoming':
      case 'popular':
      case 'top_rated':
      case 'trending_today':
      case 'trending_this_week':
        fetchUrl = `${endPoint_keyValuePair[1]}?api_key=${apiKey}`;
        break;

      case 'details':
      case 'releaseDates':
      case 'watchProviders':
      case 'credits':
      case 'similar':
      case 'recommendations':
      case 'movie':
      case 'discover':
      case 'keyword':
      case 'trailers':
        fetchUrl = `${endPoint_keyValuePair[1].replace('movie_id', `${opt_movie_id as number}`)}`;
        break;

      default:
        fetchUrl = undefined;
        // Identify bad API call without leaking API Key to the dom's console
        throw new Error(`Failure at endpoint creation for key: ${endPoint_keyValuePair[0]}`);
    }

    /** Fetch Responses: Status Handler */
    const response: Response = await fetch(`${fetchUrl}`, options);

    if (!response.ok) {
      abortController?.abort();
      throw new Error(`Abort issued to fetch for key: ${endPoint_keyValuePair[0]}. Response status: ${response.status}`);
    } else {
      const awaitResponse: Type_fetchTmdbResponse_Response_Promise = await response.json();
      return awaitResponse;
    }

    /** Catch && process errors */
  } catch (error) {
    console.error(error);
  }
};

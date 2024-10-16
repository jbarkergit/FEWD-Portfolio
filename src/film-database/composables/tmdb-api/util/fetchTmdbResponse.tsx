import { Type_Tmdb_Movie_Keys_Union } from '../data/tmdbEndPoints';
import { Type_Tmdb_Api_Union } from '../types/TmdbDataTypes';

/** fetchTmdbResponse Utility Payload && Promise/Resolved Response Types */
type Type_fetchTmdbResponse_Response_ResolvedPromise = {
  results: Type_Tmdb_Api_Union[];
  page?: number;
  total_pages?: number;
  total_results?: number;
  dates?: { maximum: string; minimum: string };
};

type Type_fetchTmdbResponse_Response_Promise = Promise<Type_fetchTmdbResponse_Response_ResolvedPromise | undefined>;

export const fetchTmdbResponse = async (keyValuePair: { key: Type_Tmdb_Movie_Keys_Union; endpoint: string }): Type_fetchTmdbResponse_Response_Promise => {
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
    const response: Response = await fetch(`${keyValuePair.endpoint}`, options);

    if (!response.ok) {
      abortController?.abort();
      throw new Error(`Abort issued to fetch for key: ${keyValuePair.key}. Response status: ${response.status}`);
    } else {
      const awaitResponse: Type_fetchTmdbResponse_Response_Promise = await response.json();
      return awaitResponse;
    }
  } catch (error) {
    console.error(error);
  }
};

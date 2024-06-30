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

export const fetchTmdbResponse = async (keyEndpointPair: [key: string, value: string], opt_movie_id?: number): Type_fetchTmdbResponse_Response_Promise => {
  // TMDB API Authorization with Signal
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
    // Construct fetch url
    const apiKey: string = import.meta.env.VITE_TMDB_API_KEY;
    const fetchUrl: string | undefined = `${keyEndpointPair[1]}?api_key=${apiKey}`;

    // Fetch Responses: Status Handler
    const response: Response = await fetch(`${fetchUrl}`, options);

    if (!response.ok) {
      abortController?.abort();
      throw new Error(`Abort issued to fetch for key: ${keyEndpointPair[0]}. Response status: ${response.status}`);
    } else {
      const awaitResponse: Type_fetchTmdbResponse_Response_Promise = await response.json();
      return awaitResponse;
    }
  } catch (error) {
    console.error(error);
  }
};

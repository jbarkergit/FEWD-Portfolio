export const useTmdbFetch = async (endPoint: string, movie_id?: string, person_id?: string): Promise<unknown> => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
  };

  try {
    const response: Response = await fetch(`${endPoint}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, options);
    const rawData: unknown = await response.json();
    if (!response.ok) throw new Error(`${response.status}`);
    else return rawData;
  } catch (error) {
    console.error('Request failure status:', error);
  }
};

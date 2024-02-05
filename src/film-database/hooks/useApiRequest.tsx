import { useState } from 'react';

export const useApiRequest = async (endPoint: string) => {
  const [responseLimited, setResponseLimited] = useState<boolean>(false);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
  };

  console.log(import.meta.env.VITE_TMDB_API_KEY);

  try {
    const response: Response = await fetch(`${endPoint}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, options);

    if (!response.ok) {
      if (!responseLimited) setResponseLimited(true);
      throw new Error(`${response.status}`);
    } else if (!responseLimited) {
      setResponseLimited(true);
      return (await response.json()) as [] | {} | unknown;
    } else {
      console.log('Responses rate limit met, refusing request.');
    }
  } catch (error) {
    console.error('Request failure status:', error);
    throw error;
  }
};

import { useState } from 'react';

export const useApiRequest = async (endPoint: string) => {
  const API_KEY: string = '';
  const [responseLimiter, setResponseLimiter] = useState<number>(0);

  try {
    const response: Response = await fetch(`${endPoint}`);

    if (!response.ok && responseLimiter === 0) {
      setResponseLimiter((previousState) => previousState + 1);
      throw new Error(`${response.status}`);
    } else if (responseLimiter === 0) {
      setResponseLimiter((previousState) => previousState + 1);
      return (await response.json()) as [] | {} | unknown;
    } else {
      console.log('Response limit met, refusing request.');
    }
  } catch (error) {
    console.error('Request failure status:', error);
    throw error;
  }
};

import { useState } from 'react';

export const useApiRequest = async (endPoint: string, AUTH_KEY: string) => {
  const [responseLimited, setResponseLimited] = useState<boolean>(false);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${AUTH_KEY}`,
    },
  };

  try {
    const response: Response = await fetch(`${endPoint}`, options);

    if (!response.ok) {
      if (responseLimited === false) setResponseLimited(true);
      throw new Error(`${response.status}`);
    } else if (responseLimited === false) {
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

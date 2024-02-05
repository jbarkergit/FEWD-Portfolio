import { useState, useEffect } from 'react';

const fetchTmdbData = async (endPoint: string): Promise<[] | {} | undefined> => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
  };

  try {
    const response: Response = await fetch(`${endPoint}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, options);
    const rawData: [] | {} | undefined = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status}`);
    } else {
      if (response.ok) return rawData;
    }
  } catch (error) {
    console.error('Request failure status:', error);
  }
};

export const useTmdbData = () => {
  const [nowPlaying, setNowPlaying] = useState<[]>([]);

  useEffect(() => {
    fetchTmdbData('https://api.themoviedb.org/3/movie/now_playing')
      .then((rawData) => setNowPlaying(rawData as []))
      .catch((error) => console.error('Error:', error));
  }, []);

  console.log(nowPlaying);
};

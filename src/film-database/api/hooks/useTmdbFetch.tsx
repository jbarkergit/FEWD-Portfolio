/**
 * TMDB API Fetch
 * @param endPoint
 * @param movie_id
 * @param person_id
 * @returns
 */

import { TmdbDataUnionArrayType } from '../types/TmdbDataTypes';

type TmdbApiFetchTypes = {
  endPoint: string;
  movie_id?: string | undefined;
  person_id?: string | undefined;
};

const tmdbApiFetch = async ({ endPoint, movie_id, person_id }: TmdbApiFetchTypes): Promise<unknown> => {
  // authorization options for TMDB API
  const options: RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${import.meta.env.VITE_TMDB_AUTH_KEY}`,
    },
  };

  try {
    // check for optional paramaters, alter response accordingly
    let url: string;

    switch (true) {
      case !!movie_id:
        url = `${endPoint.replace('{movie_id}', movie_id)}`;
        break;
      case !!person_id:
        url = `${endPoint.replace('{person_id}', person_id)}`;
        break;
      default:
        url = `${endPoint}`;
    }

    // fetch data
    const response: Response = await fetch(`${url}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, options);
    const rawData: unknown = await response.json();

    // ensure response status is OK
    if (!response.ok) throw new Error(`${response.status}`);
    // return response
    else return rawData;

    // catch errors
  } catch (error) {
    console.error('Request failure status:', error);
  }
};

/**
 * Fetch information by specified params utilizing tmdbApiFetch()
 * @param param0
 * @returns
 */

export type UseTmdbFetchKeyValuePairType = { key: string; endPoint: string };

export type UseTmdbDataArrayType = { key: string; data: TmdbDataUnionArrayType }[];

export const useTmdbFetch = async (
  category: { key: string; endPoint: string }[],
  movie_id?: string | undefined,
  person_id?: string | undefined
): Promise<UseTmdbDataArrayType | undefined> => {
  // initialize empty array to be returned for useState storage
  const dataArray: UseTmdbDataArrayType = [];

  try {
    // utilize Promise.all to fetch requests in parallel
    await Promise.all(
      // create a new array to assign aliases to each keyValuePair for clarity
      category.map(async (keyValuePair: UseTmdbFetchKeyValuePairType) => {
        // await end points -- explicit type cast to by-pass type checks (TmdbDataUnionArrayType provides potential types)
        const data: TmdbDataUnionArrayType = (await tmdbApiFetch({ endPoint: keyValuePair.endPoint, movie_id, person_id })) as TmdbDataUnionArrayType;
        // push new array into dataArray
        if (data) dataArray.push({ key: keyValuePair.key, data: data });
      })
    );
    // return our new array of data
    return dataArray;
  } catch (error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
};

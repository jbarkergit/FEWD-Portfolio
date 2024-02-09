type tmdbApiFetchTypes = {
  endPoint: string;
  movie_id?: string;
  person_id?: string;
};

/**
 * TMDB API Fetch
 * @param endPoint
 * @param movie_id
 * @param person_id
 * @returns
 */

const tmdbApiFetch = async ({ endPoint, movie_id, person_id }: tmdbApiFetchTypes): Promise<unknown> => {
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

export const useTmdbFetch = async (category: { key: string; endPoint: string }[], movie_id?: string, person_id?: string): Promise<{}[] | undefined> => {
  // initialize empty array to be returned for useState storage
  const dataArray: {}[] = [];

  try {
    // utilize Promise.all to fetch requests in parallel
    await Promise.all(
      // create a new array based on category keyValuePairs
      category.map(async (keyValuePair) => {
        // await end points
        await tmdbApiFetch({ endPoint: keyValuePair.endPoint, movie_id, person_id }).then((data) => {
          // push new array into dataArray
          dataArray.push({ [keyValuePair.key]: { key: keyValuePair.key, data: data } });
        });
      })
    );

    // return our new array of data
    return dataArray;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

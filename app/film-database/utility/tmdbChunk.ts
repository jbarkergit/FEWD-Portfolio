import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';

type DataGeneric =
  | Exclude<TmdbResponseFlat[keyof TmdbResponseFlat], TmdbResponseFlat['credits']>
  | TmdbResponseFlat['credits']['cast']
  | TmdbResponseFlat['credits']['crew'];

type ChunkedGeneric<T> = DataGeneric[];

export const tmdbChunk = <T extends DataGeneric>(data: T, chunkSize: number): ChunkedGeneric<T> => {
  const dataToArray = Array.isArray(data) ? data : Object.values(data);

  let chunked: ChunkedGeneric<T> = [];

  for (let i = 0; i < dataToArray.length; i += chunkSize + 1) {
    chunked.push(dataToArray.slice(i, i + chunkSize + 1));
  }

  return chunked;
};

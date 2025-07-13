import { tmdbDiscoveryIds } from '~/film-database/composables/const/tmdbDiscoveryIds';
import { tmdbEndpoints } from '~/film-database/composables/const/tmdbEndpoints';
import type { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { MovieProvider, TmdbEndpointKeys, TmdbResponse } from '~/film-database/composables/types/TmdbResponse';

type CastCrew = 'cast' | 'crew';
type TargetKey = TmdbEndpointKeys | CastCrew;

export type PaginateDataProvider = Array<
  | MovieProvider
  | TmdbResponse['number']['recommendations']['results']
  | TmdbResponse['number']['credits']['cast'][0]
  | TmdbResponse['number']['credits']['crew'][0]
>;

export const usePaginateData = (rawData: ReturnType<typeof tmdbCall>, viewportChunkSize: number) => {
  // Initialize mutatable map
  let store: Map<TmdbEndpointKeys | CastCrew, PaginateDataProvider[]> | undefined = new Map(undefined);

  // Paginate data callback
  const paginateData = (targetKey: TargetKey, data: PaginateDataProvider) => {
    // Get map by key
    const isKeyMapped: boolean = store.has(targetKey);

    // If key doesn't exist in map, create new entry
    if (!isKeyMapped) store.set(targetKey, []);

    // Paginate data
    for (let i = 0; i < data.length; i += viewportChunkSize + 1) {
      store.get(targetKey)!.push(data.slice(i, i + viewportChunkSize + 1));
    }
  };

  // Envoke pagination
  const process = (obj: ReturnType<typeof tmdbCall>) => {
    const key = Object.keys(obj)[0] as TargetKey;

    if (key in tmdbEndpoints.never || key in tmdbDiscoveryIds) {
      const rec = (obj[key] as TmdbResponse['number']['recommendations']).results;
      paginateData(key, rec);
    } else if (key === 'credits') {
      const { id, cast, crew } = obj as TmdbResponse['number']['credits'];
      paginateData('cast', cast);
      paginateData('crew', crew);
    } else {
      return undefined;
    }
  };

  if (Array.isArray(rawData)) for (const obj of rawData) process(obj);
  else process(rawData);

  // Return
  return Array.from(store);
};

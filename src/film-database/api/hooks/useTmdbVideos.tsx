import { tmdbEndPoints } from '../data/tmdbEndPoints';
import { useTmdbApi } from './useTmdbApi';

export const useTmdbVideos = async (propertyId: string) => {
  return await useTmdbApi({ tmdbEndPointKeyValuePairArr: tmdbEndPoints.movies.find((obj) => obj.key === 'videos'), movie_id: `${propertyId}` });
};

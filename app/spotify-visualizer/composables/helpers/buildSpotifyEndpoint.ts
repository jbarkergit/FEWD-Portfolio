import type { SpotifyPathParams } from '~/spotify-visualizer/composables/types/SpotifyPathParams';

export const buildSpotifyEndpoint = (endpoint: string, pathParams: Partial<SpotifyPathParams> | undefined): string => {
  // defaultLimit: 50, // spotify default: 20

  if (pathParams) {
  }

  return endpoint;
};

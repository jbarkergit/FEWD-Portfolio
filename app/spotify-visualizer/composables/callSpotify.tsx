import { spotifyEndpoints, type SpotifyRequest } from '~/spotify-visualizer/composables/const/spotifyEndpoints';
import type { SpotifyResponse } from '~/spotify-visualizer/composables/types/SpotifyResponse';

export async function callSpotify<K extends keyof typeof spotifyEndpoints>(
  request: K,
  ...args: Parameters<(typeof spotifyEndpoints)[K]>
): Promise<SpotifyResponse> {
  const endpointFn = spotifyEndpoints[request] as (...args: Parameters<(typeof spotifyEndpoints)[K]>) => SpotifyRequest;
  const endpointRequest = endpointFn(...args);

  const res = await fetch(endpointRequest.endpoint, {
    method: endpointRequest.method,
    body: endpointRequest.body ? JSON.stringify(endpointRequest.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SPOTIFY_CLIENT_ID}`,
    },
  });

  return res.json();
}

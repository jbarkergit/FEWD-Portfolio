import type { spotifyEndpoints } from '~/spotify-visualizer/composables/const/spotifyEndpoints';
import type { SpotifyResponse } from '~/spotify-visualizer/composables/types/SpotifyResponse.ts';

// https://developer.spotify.com/documentation/web-api
export function callSpotify(request: keyof typeof spotifyEndpoints) {}

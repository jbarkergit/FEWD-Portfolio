import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { callSpotify } from '~/spotify-visualizer/composables/callSpotify';
import type { SpotifyResponseFor } from '~/spotify-visualizer/composables/types/SpotifyResponse';

export async function clientLoader() {
  const userPlaylists = await callSpotify('getCurrentUsersPlaylists', { limit: 50, offset: 0 });
  return { userPlaylists };
}

export const useSpotifyLoader = () => useLoaderData() as Awaited<ReturnType<typeof clientLoader>>;

export default function SpotifyVisualizer() {
  const { userPlaylists } = useSpotifyLoader();
  console.log(userPlaylists);

  return (
    <div className='spotify'>
      <div></div>
    </div>
  );
}

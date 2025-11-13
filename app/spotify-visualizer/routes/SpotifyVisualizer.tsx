import { useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { initSpotifyAuth } from '~/spotify-visualizer/composables/auth/SpotifyAuthFlow';
import { callSpotify } from '~/spotify-visualizer/composables/callSpotify';

export async function clientLoader() {
  const userPlaylists = await callSpotify('getCurrentUsersPlaylists', { limit: 50, offset: 0 });
  return { userPlaylists };
}

export const useSpotifyLoader = () => useLoaderData() as Awaited<ReturnType<typeof clientLoader>>;

export default function SpotifyVisualizer() {
  useEffect(() => void initSpotifyAuth(), []);
  const { userPlaylists } = useSpotifyLoader();
  console.log(userPlaylists);

  return (
    <div className='spotify'>
      <div></div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { initSpotifyAuth } from '~/spotify-visualizer/composables/auth/SpotifyAuthFlow';
import { callSpotify } from '~/spotify-visualizer/composables/callSpotify';
import type { SpotifyResponseFor } from '~/spotify-visualizer/composables/types/SpotifyResponse';

export async function clientLoader() {
  void (await initSpotifyAuth());
}

// export const useSpotifyLoader = () => useLoaderData() as Awaited<ReturnType<typeof clientLoader>>;

export default function SpotifyVisualizer() {
  const [userPlaylists, setState] = useState<SpotifyResponseFor<'getCurrentUsersPlaylists'>>();

  useEffect(() => {
    const fetch = async () => {
      const userPlaylists = await callSpotify('getCurrentUsersPlaylists', { limit: 50, offset: 0 });
      setState(userPlaylists);
    };
    fetch();
  }, []);

  return (
    <div className='spotify'>
      <ul className='spotify__fonts'>
        {userPlaylists?.items.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

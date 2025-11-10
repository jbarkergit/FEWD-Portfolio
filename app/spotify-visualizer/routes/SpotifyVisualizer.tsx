import { useEffect, useState } from 'react';
import { callSpotify } from '~/spotify-visualizer/composables/callSpotify';
import type { SpotifyResponse } from '~/spotify-visualizer/composables/types/SpotifyResponse';

export default function () {
  const [userData, setUserData] = useState<SpotifyResponse[]>();

  useEffect(() => {
    const userPlaylists = callSpotify('getCurrentUsersPlaylists');
    setUserData(userPlaylists);
  }, []);

  return (
    <div className='spotify'>
      <main></main>
    </div>
  );
}

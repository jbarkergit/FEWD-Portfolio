import { initSpotifyAuth } from '~/spotify-visualizer/composables/auth/SpotifyAuthFlow';
import Library from '~/spotify-visualizer/features/library/Library';
import Main from '~/spotify-visualizer/features/main/Main';
import Navigation from '~/spotify-visualizer/features/navigation/Navigation';
import Overlay from '~/spotify-visualizer/features/overlay/Overlay';
import Social from '~/spotify-visualizer/features/social/Social';

export async function clientLoader() {
  void (await initSpotifyAuth());
}

// export const useSpotifyLoader = () => useLoaderData() as Awaited<ReturnType<typeof clientLoader>>;

export default function SpotifyVisualizer() {
  return (
    <div className='spotify'>
      <div className='spotify__wrapper'>
        <div className='spotify__wrapper__overlay'>
          <Overlay />
        </div>
        <div className='spotify__wrapper__content'>
          <Navigation />
          <Library />
          <Main />
          <Social />
        </div>
      </div>
    </div>
  );
}

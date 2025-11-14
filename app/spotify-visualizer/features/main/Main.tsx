import { ArtistRouteProvider } from '~/spotify-visualizer/context/ArtistRouteContext';
import { HomeRouteProvider } from '~/spotify-visualizer/context/HomeRouteContext';
import Artist from '~/spotify-visualizer/features/main/artist/Artist';
import Home from '~/spotify-visualizer/features/main/home/Home';

const Main = () => {
  return (
    <div className='main'>
      <HomeRouteProvider>
        <Home />
      </HomeRouteProvider>
      <ArtistRouteProvider>
        <Artist />
      </ArtistRouteProvider>
    </div>
  );
};

export default Main;

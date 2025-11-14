import { useHomeRouteContext } from '~/spotify-visualizer/context/HomeRouteContext';
import HomeAll from '~/spotify-visualizer/features/main/home/tabs/HomeAll';
import HomeAudiobooks from '~/spotify-visualizer/features/main/home/tabs/HomeAudiobooks';
import HomeMusic from '~/spotify-visualizer/features/main/home/tabs/HomeMusic';
import HomePodcasts from '~/spotify-visualizer/features/main/home/tabs/HomePodcasts';

const Home = () => {
  const { homeRoute } = useHomeRouteContext();

  switch (homeRoute) {
    case 'all':
      return <HomeAll />;
    case 'audiobooks':
      return <HomeAudiobooks />;
    case 'music':
      return <HomeMusic />;
    case 'podcasts':
      return <HomePodcasts />;
    default:
      return <HomeAll />;
  }
};

export default Home;

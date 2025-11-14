import { useArtistRouteContext } from '~/spotify-visualizer/context/ArtistRouteContext';
import ArtistAlbums from '~/spotify-visualizer/features/main/artist/tabs/ArtistAlbums';
import ArtistCompilations from '~/spotify-visualizer/features/main/artist/tabs/ArtistCompilations';
import ArtistFeaturesAndMore from '~/spotify-visualizer/features/main/artist/tabs/ArtistFeaturesAndMore';
import ArtistHome from '~/spotify-visualizer/features/main/artist/tabs/ArtistHome';
import ArtistMerch from '~/spotify-visualizer/features/main/artist/tabs/ArtistMerch';
import ArtistSinglesAndEPs from '~/spotify-visualizer/features/main/artist/tabs/ArtistSinglesAndEPs';

const Artist = () => {
  const { tab } = useArtistRouteContext();

  switch (tab) {
    case 'albums':
      return <ArtistAlbums />;
    case 'compilations':
      return <ArtistCompilations />;
    case 'featuresAndMore':
      return <ArtistFeaturesAndMore />;
    case 'home':
      return <ArtistHome />;
    case 'merch':
      return <ArtistMerch />;
    case 'singlesAndEps':
      return <ArtistSinglesAndEPs />;
    default:
      return <ArtistHome />;
  }
};

export default Artist;

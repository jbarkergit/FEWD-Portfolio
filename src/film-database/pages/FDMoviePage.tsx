// Context
import { CatalogProvider } from '../context/CatalogContext';
// Features
import FDCastCrew from '../features/movie/FDCastCrew';

const FDMoviePage = () => {
  // const getProp = (key: Namespace_TmdbEndpointsKeys.Keys_Union) => {
  //   return castCrew.find((obj) => Object.keys(obj)[0] === key);
  // };
  // const details = getProp('details') as Namespace_Tmdb.Details_Obj;
  // const watchProviders = getProp('watchProviders') as Namespace_Tmdb.WatchProviders_Obj;
  // const videos = getProp('videos') as Namespace_Tmdb.Videos_Obj;
  // const recommendations = getProp('recommendations') as Namespace_Tmdb.Recommendations_Obj;

  return (
    <div className='filmDatabase' data-layout-carousel>
      <CatalogProvider>
        <FDCastCrew />
      </CatalogProvider>
    </div>
  );
};

export default FDMoviePage;

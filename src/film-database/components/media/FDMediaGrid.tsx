import { Type_Tmdb_ApiCallUnion_Obj } from '../../api/types/TmdbDataTypes';
import FDSectionHeader from './header/FDSectionHeader';
import FDPosterOverlay from './overlay/FDPosterOverlay';
import FDPosterProp from './poster/FDPosterProp';

type Type_PropDrill = {
  mapKey: string;
  mapValue: Type_Tmdb_ApiCallUnion_Obj[];
  useVideoPlayer: (propertyId: string) => Promise<void>;
  grid: boolean;
};

const FDMediaGrid = ({ mapKey, mapValue, useVideoPlayer, grid }: Type_PropDrill) => {
  return (
    <section className='FDMediaGrid'>
      <FDSectionHeader mapKey={mapKey} />
      <ul className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'}>
        {mapValue.map((values) => (
          <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} />
        ))}
        {grid ? null : <FDPosterOverlay />}
      </ul>
    </section>
  );
};
export default FDMediaGrid;

import { useState } from 'react';
import { Type_Tmdb_ApiCallUnion_Obj } from '../../api/types/TmdbDataTypes';
import FDCarouselOverlay from './carousel-overlay/FDCarouselOverlay';
import FDSectionHeader from './header/FDSectionHeader';
import FDPosterProp from './poster/FDPosterProp';

type Type_PropDrill = {
  mapKey: string;
  mapValue: Type_Tmdb_ApiCallUnion_Obj[];
  useVideoPlayer: (propertyId: string) => Promise<void>;
  grid: boolean;
};

const FDMediaGrid = ({ mapKey, mapValue, useVideoPlayer, grid }: Type_PropDrill) => {
  const [posterHeight, setPosterHeight] = useState<string | undefined>(undefined);

  return (
    <section className='FDMediaGrid'>
      <FDSectionHeader mapKey={mapKey} />
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'}>
          {mapValue.map((values) => (
            <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} setPosterHeight={setPosterHeight} />
          ))}
          {grid ? null : <FDCarouselOverlay posterHeight={posterHeight} />}
        </ul>
      </div>
    </section>
  );
};
export default FDMediaGrid;

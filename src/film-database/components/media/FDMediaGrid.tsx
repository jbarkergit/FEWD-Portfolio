// React
import { useRef, useState } from 'react';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Types
import { Type_Tmdb_ApiCallUnion_Obj, Type_Tmdb_Trailer_Obj } from '../../api/types/TmdbDataTypes';
// Components
import FDCarouselOverlay from './carousel-overlay/FDCarouselOverlay';
import FDSectionHeader from './header/FDSectionHeader';
import FDPosterProp from './poster/FDPosterProp';

type Type_PropDrill = {
  mapKey: string;
  mapValue: Type_Tmdb_ApiCallUnion_Obj[] | Type_Tmdb_Trailer_Obj[];
  useVideoPlayer: (propertyId: string) => Promise<void>;
  grid: boolean;
};

const FDMediaGrid = ({ mapKey, mapValue, useVideoPlayer, grid }: Type_PropDrill) => {
  /** Carousel navigation functionality */
  const [posterDimensions, setPosterDimensions] = useState<{ width: number | undefined; height: number | undefined }>({ width: undefined, height: undefined });
  const [setIndex, setSetIndex] = useState<{ prevIndex: number; currIndex: number }>({ prevIndex: 0, currIndex: 0 });
  const dataLength: number = grid ? mapValue.length / 6 : mapValue.length / 7.5;

  const carousel = useRef<HTMLUListElement>(null);
  const carouselWrapper = useRef<HTMLDivElement>(null);

  return (
    <section className='FDMediaGrid'>
      <FDSectionHeader mapKey={mapKey} />
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'} ref={carouselWrapper}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carousel}>
          {mapValue.map((values) => (
            <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} setPosterDimensions={setPosterDimensions} key={uuidv4()} />
          ))}
        </ul>

        {grid ? null : <FDCarouselOverlay posterDimensions={posterDimensions} dataLength={dataLength} setSetIndex={setSetIndex} />}
      </div>
    </section>
  );
};
export default FDMediaGrid;

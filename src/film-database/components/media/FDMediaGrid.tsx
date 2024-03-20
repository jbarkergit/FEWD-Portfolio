// React
import { useEffect, useRef, useState } from 'react';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Types
import { Type_Tmdb_ApiCallUnion_Obj } from '../../api/types/TmdbDataTypes';
// Components
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
  /** Universal variables */
  const dataLength: number = grid ? mapValue.length / 6 : mapValue.length / 8;
  const [setIndex, setSetIndex] = useState<{ prevIndex: number; currIndex: number }>({ prevIndex: 1, currIndex: 1 });

  /** Data pagination */
  const [paginatedData, setPaginatedData] = useState<Type_Tmdb_ApiCallUnion_Obj[]>([]);

  useEffect(() => {
    if (mapValue && !grid)
      setPaginatedData((prevData: Type_Tmdb_ApiCallUnion_Obj[]) => {
        const startIndex: number = prevData.length === 0 ? 0 : prevData.length + 1;
        const desiredLength: number = grid ? 6 : 8;
        const endIndex: number = desiredLength * setIndex.currIndex;
        return [...prevData, ...mapValue.slice(startIndex, endIndex)];
      });
  }, [mapValue, setIndex]);

  /** Update navigation overlay button height dynamically */
  const carouselUl = useRef<HTMLUListElement>(null);
  const [posterDimensions, setPosterDimensions] = useState<{ width: number | undefined; height: number | undefined }>({ width: undefined, height: undefined });

  const updatePosterDimensions = () => {
    if (carouselUl.current) {
      const childrenNestOne = carouselUl.current.children[0] as HTMLLIElement;
      if (childrenNestOne) {
        const childrenNestTwo = childrenNestOne.children[0];
        if (childrenNestTwo) {
          const childrenNestThree = childrenNestTwo.children[0] as HTMLDivElement;
          if (childrenNestThree) {
            const posterOverlayRect: DOMRect = childrenNestThree.getBoundingClientRect();
            setPosterDimensions({ width: posterOverlayRect?.width, height: posterOverlayRect?.height });
          }
        }
      }
    }
  };

  useEffect(() => {
    // Initial height
    updatePosterDimensions();

    window.addEventListener('resize', updatePosterDimensions);
    return () => window.removeEventListener('resize', updatePosterDimensions);
  }, [carouselUl.current]);

  /** Carousel navigation functionality */
  const carouselWrapper = useRef<HTMLDivElement>(null);

  /** Component */
  return (
    <section className='FDMediaGrid'>
      <FDSectionHeader mapKey={mapKey} />
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'} ref={carouselWrapper}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carouselUl}>
          {grid
            ? mapValue.map((values: Type_Tmdb_ApiCallUnion_Obj) => <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} key={uuidv4()} />)
            : paginatedData.map((values: Type_Tmdb_ApiCallUnion_Obj) => <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} key={uuidv4()} />)}
        </ul>
        {grid ? null : <FDCarouselOverlay posterDimensions={posterDimensions} dataLength={dataLength} setSetIndex={setSetIndex} />}
      </div>
    </section>
  );
};
export default FDMediaGrid;

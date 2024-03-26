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
  const [setIndex, setSetIndex] = useState<{ prevIndex: number; currIndex: number }>({ prevIndex: 1, currIndex: 1 });

  /** Data Pagination && Carousel Navigation */
  const [paginatedData, setPaginatedData] = useState<Type_Tmdb_ApiCallUnion_Obj[]>([]);
  const carouselUl = useRef<HTMLUListElement>(null);

  useEffect(() => {
    /** Data Pagination: Pushes data into state when setIndex changes (the user navigates) */
    const paginateData = async () => {
      if (mapValue && !grid)
        setPaginatedData((prevData: Type_Tmdb_ApiCallUnion_Obj[]) => {
          const startIndex: number = prevData.length === 0 ? 0 : prevData.length + 1;
          const endIndex: number = 8 * setIndex.currIndex;
          return [...prevData, ...mapValue.slice(startIndex, endIndex)];
        });
    };

    /** Carousel navigation functionality (INFINITE LOOP)
     * [Employed] Option #1: CSS Scroll-Snapping && JavaScript Scroll Methods (Apple, Nike)
     * Reduces overall JavaScript logic, reduces DOM manipulation, doesn't require CSS animations
     *
     * [x] Option #2: Push off-screen elements to end of queue and vise versa. (Disney) E.g. [(1), 2,3,4,5,6,7,8,9, (1 IF 9 is last index || 10, (1))]
     * Requires intervals to delay the removal of the off-screen elements to provide css animations
     *
     * [x] Option #3: Manipulate the wrapper position manually (Netflix - Single child distance)
     * Set distances require calculations that account for padding, gap and conditions for the first && last index
     * Single child distances require dom node width && gap size
     */

    paginateData().then(() => {
      if (carouselUl.current && paginatedData.length > 0 && setIndex.currIndex > 0) {
        const index = Math.min(Math.floor(paginatedData.length / setIndex.currIndex) + 1, carouselUl.current.children.length - 1);
        const childElement = carouselUl.current.children[index] as HTMLElement;
        const scrollLeft = childElement.offsetLeft - carouselUl.current.offsetLeft;
        carouselUl.current.scrollLeft = scrollLeft;
      }
    });

    console.log(setIndex);
  }, [mapValue, setIndex]);

  /** Update navigation overlay button height dynamically
   * Due to the informational footer, I'm opting to use JavaScript to set heights of the buttons in order to prevent any potential visual mishaps.
   * Due to HTML structure, there isn't an easy way to pass refs upwards; therefore, I opted to shake the tree via dom nodes (I understand this isn't the best practice)
   */

  const [posterDimensions, setPosterDimensions] = useState<{ width: number | undefined; height: number | undefined }>({ width: undefined, height: undefined });

  const updatePosterDimensions = () => {
    if (carouselUl.current) {
      const childrenNestOne = carouselUl.current.children[0] as HTMLLIElement | undefined;
      if (!childrenNestOne) return;

      const childrenNestTwo = childrenNestOne.children[0] as HTMLElement | undefined;
      if (!childrenNestTwo) return;

      const childrenNestThree = childrenNestTwo.children[0] as HTMLDivElement | undefined;
      if (!childrenNestThree) return;

      const posterOverlayRect: DOMRect = childrenNestThree.getBoundingClientRect();
      setPosterDimensions({ width: posterOverlayRect?.width, height: posterOverlayRect?.height });
    }
  };

  useEffect(() => {
    updatePosterDimensions(); // Initial height
    window.addEventListener('resize', updatePosterDimensions);
    return () => window.removeEventListener('resize', updatePosterDimensions);
  }, [carouselUl.current]);

  /** Component */
  return (
    <section className='FDMediaGrid'>
      <FDSectionHeader mapKey={mapKey} />
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carouselUl}>
          {grid
            ? mapValue.map((values: Type_Tmdb_ApiCallUnion_Obj) => <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} key={uuidv4()} />)
            : paginatedData.map((values: Type_Tmdb_ApiCallUnion_Obj) => <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} key={uuidv4()} />)}
        </ul>
        {grid ? null : <FDCarouselOverlay posterDimensions={posterDimensions} tmdbArrLength={mapValue.length - 1} setSetIndex={setSetIndex} />}
      </div>
    </section>
  );
};
export default FDMediaGrid;

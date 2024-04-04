import { useEffect, useRef, useState } from 'react';
// Lib
import { v4 as uuidv4 } from 'uuid';
// Types
import { Type_Tmdb_ApiCall_Union } from '../../api/types/TmdbDataTypes';
// Components
import FDCarouselOverlay from './carousel-overlay/FDCarouselOverlay';
import FDPosterProp from './poster/FDPosterProp';

type Type_PropDrill = {
  dataKey: string;
  dataLabel?: string | undefined;
  dataValue: Type_Tmdb_ApiCall_Union[];
  useVideoPlayer: (title: string, backdrop: string, overview: string, propId: number) => Promise<void>;
  grid: boolean;
};

const FDMediaGrid = ({ dataKey, dataLabel, dataValue, useVideoPlayer, grid }: Type_PropDrill) => {
  const [setIndex, setSetIndex] = useState<{ prevIndex: number; currIndex: number }>({ prevIndex: 1, currIndex: 1 });

  /** Data Pagination && Carousel Navigation */
  const [paginatedData, setPaginatedData] = useState<Type_Tmdb_ApiCall_Union[]>([]);
  const carouselUl = useRef<HTMLUListElement>(null);

  /** Data Pagination: Pushes data into state when setIndex changes (the user navigates) */
  useEffect(() => {
    if (!grid) {
      setPaginatedData((prevData: Type_Tmdb_ApiCall_Union[]) => {
        const prevDataLength: number = prevData.length - 1;
        const startIndex: number = prevDataLength === 0 ? 0 : prevDataLength + 1;
        const endIndex: number = 8 * setIndex.currIndex;
        return [...prevData, ...dataValue.slice(startIndex, endIndex)] as Type_Tmdb_ApiCall_Union[];
      });
    }
  }, [setIndex]);

  /** INFINITE LOOP
   * [EMPLOYED] Animation && End of Loop Wrapping: CSS Scroll-Snapping && JavaScript Scroll Methods
   * Requires perfect min max boundaries for indexing
   * Reduces overall JavaScript logic, doesn't require CSS animations
   *
   * [x] Infinite Loop: Push off-screen elements to end of queue and vise versa. E.g. [(1), 2,3,4,5,6,7,8,9, (1 IF 9 is last index || 10, (1))]
   * Requires intervals to delay the removal of the off-screen elements to provide css animations
   *
   * [x] Infinite Loop: Manipulate the wrapper position manually
   * Set distances require calculations that account for padding, gap and conditions for the first && last index
   * Single child distances require dom node width && gap size
   */
  useEffect(() => {
    if (carouselUl.current) {
      const firstPossibleIndex: boolean = setIndex.currIndex === 1;
      const lastPossibleIndex: boolean = setIndex.currIndex === Math.ceil(dataValue.length / 8);

      let nextChildsIndex: number;

      switch (true) {
        case firstPossibleIndex:
          nextChildsIndex = 0;
          break;

        case lastPossibleIndex:
          nextChildsIndex = dataValue.length - 1;
          break;

        default:
          nextChildsIndex = (setIndex.currIndex - 1) * 8 - 1;
          break;
      }

      const carouselChildren: HTMLCollection = carouselUl.current.children;
      const nextChild = carouselChildren[nextChildsIndex] as HTMLLIElement;
      if (nextChild) {
        const scrollDistance: number = nextChild.offsetLeft - carouselUl.current.offsetLeft;
        carouselUl.current.scrollTo({ left: scrollDistance, behavior: 'smooth' });
      }
    }
  }, [paginatedData]);

  /** Update navigation overlay button height dynamically
   * Due to the informational footer, I'm opting to use JavaScript to set heights of the buttons in order to prevent any potential visual mishaps.
   * Due to HTML structure, there isn't an easy way to pass refs upwards; therefore, I opted to drill dom nodes (I understand this isn't the best practice)
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
      <div className='FDMediaGrid__header'>
        <h2 className='FDMediaGrid__header--h2'>{dataLabel ? dataLabel : dataKey.replace('_', ' ')}</h2>
      </div>
      <div className='FDMediaGrid__wrapper' data-status={grid ? 'grid' : 'carousel'}>
        <ul className='FDMediaGrid__wrapper__ul' data-status={grid ? 'grid' : 'carousel'} ref={carouselUl}>
          {grid
            ? dataValue.map((values) => <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} grid={grid} key={uuidv4()} />)
            : paginatedData.map((values) => <FDPosterProp mapValue={values} useVideoPlayer={useVideoPlayer} grid={grid} key={uuidv4()} />)}
        </ul>
        {grid ? null : <FDCarouselOverlay posterDimensions={posterDimensions} tmdbArrLength={dataValue.length - 1} setSetIndex={setSetIndex} />}
      </div>
    </section>
  );
};
export default FDMediaGrid;

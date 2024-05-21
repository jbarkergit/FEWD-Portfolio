import { useEffect, RefObject, forwardRef, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Type_Tmdb_ApiCall_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselOverlay from './FDCarouselOverlay';
import FDCarouselPoster from './FDCarouselPoster';
import { Type_Tmdb_Movie_Keys_Union } from '../../composables/tmdb-api/data/tmdbEndPoints';

type Type_PropDrill = {
  data: Type_Tmdb_ApiCall_Union[] | Type_Tmdb_Movie_Keys_Union | undefined;
  isGridLayout: boolean;
  useComponentProps: {
    fdMediaRef: RefObject<HTMLElement>;
    ref: RefObject<HTMLUListElement>;
    carouselUlRef: RefObject<HTMLUListElement>;
    visibleNodesCount: number;
  };
};

const FDCarousel = forwardRef<HTMLUListElement, Type_PropDrill>(({ data, isGridLayout, useComponentProps }: Type_PropDrill, ref) => {
  /** Global State Dependencies */
  const [carouselNavIndex, setCarouselNavIndex] = useState<number>(1);

  /** Carousel Target Index State */
  const carouselRef = useRef<HTMLElement>(null);

  const updateCarouselTargetIndex = () => {
    if (fdMediaRef.current) {
      const carouselArr: Element[] = [...fdMediaRef.current.children];

      for (let i = 0; i < carouselArr.length; i++) {
        if (carouselArr[i] === carouselRef.current) {
          firePaginationRequest(i);
          break;
        }
      }
    }
  };

  useEffect(() => updateCarouselTargetIndex(), [carouselNavIndex]);

  /** Post-mount Data Pagination */
  const [postMountPaginatedObj, setPostMountPaginatedObj] = useState<Type_Tmdb_useApiReturn_Obj>(tmdbDataObject);
  useEffect(() => console.log(postMountPaginatedObj), [postMountPaginatedObj]);

  const firePaginationRequest = (carouselTargetIndex: number): void => {
    const currentPaginatedLength: number = postMountPaginatedObj.value.length;
    const originalDataTarget: Type_Tmdb_ApiCall_Union[] = tmdbDataArr[carouselTargetIndex].value;
    const maxLengthToPaginate: number = originalDataTarget.length - 1;
    const isPaginationComplete: boolean = currentPaginatedLength === maxLengthToPaginate;

    if (!isPaginationComplete) {
      setPostMountPaginatedObj((prevObj) => {
        const startingSliceIndex: number = prevObj.value.length + 1;
        // Case where ending index is larger than prevObj's length isn't an issue given we're using .slice which won't go out of bounds
        const endingSliceIndex: number = carouselNavIndex * visibleNodesCount + 1;

        const slicedData: Type_Tmdb_ApiCall_Union[] = originalDataTarget.slice(startingSliceIndex, endingSliceIndex);
        const updatedDataValue: Type_Tmdb_ApiCall_Union[] = (prevObj.value = [...prevObj.value, ...slicedData]);
        const updatedObject: Type_Tmdb_useApiReturn_Obj = { key: prevObj.key, label: prevObj.label, value: updatedDataValue };

        return updatedObject;
      });
    }
  };

  /** INFINITE LOOP BUTTON NAVIGATION
   * [EMPLOYED] Animation && End of Loop Wrapping: CSS Scroll-Snapping && JavaScript Scroll Methods
   * Reduces overall JavaScript logic, doesn't require CSS animations
   *
   * [x] Infinite Loop: Push off-screen elements to end of queue and vise versa. E.g. [(1), 2,3,4,5,6,7,8,9, (1 IF 9 is last index || 10, (1))]
   * Requires intervals to delay the removal of the off-screen elements to provide css animations
   *
   * [x] Infinite Loop: Manipulate the wrapper position manually
   * Set distances require calculations that account for padding, gap and conditions for the first && last index
   * Single child distances require dom node width && gap size
   */

  const navigateCarousel = (): void => {
    if (!isGridLayout && carouselUlRef.current) {
      const carouselChildren: HTMLCollection = carouselUlRef.current.children;
      const targetIndex: number = carouselNavIndex * visibleNodesCount - 1;
      const maxIndex: number = postMountPaginatedObj.value.length;
      // Target index isn't as simple as the navigation index multiplied by the visibleNodesCount given it can be out of bounds
      const clampedTargetIndex: number = Math.max(1, Math.min(targetIndex, maxIndex));
      const nextChild = carouselChildren[clampedTargetIndex] as HTMLLIElement;

      if (nextChild) {
        const scrollDistance: number = nextChild.offsetLeft - carouselUlRef.current.offsetLeft;
        carouselUlRef.current.scrollTo({ left: scrollDistance, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => navigateCarousel(), [postMountPaginatedObj, carouselNavIndex]);

  /** Component */
  const heading: string = tmdbDataObject.label ? tmdbDataObject.label : tmdbDataObject.key.replaceAll('_', ' ');

  return (
    <section className='fdMedia__carousel' key={uuidv4()} aria-label={`${heading} Section`} ref={carouselRef}>
      <div className='fdMedia__carousel__header'>
        <h2 className='fdMedia__carousel__header--h2'>{heading}</h2>
      </div>
      <div className='fdMedia__carousel__wrapper'>
        <ul className='fdMedia__carousel__wrapper__ul' ref={ref} data-layout={isGridLayout ? 'grid' : 'carousel'}>
          {postMountPaginatedObj.value.map((paginatedObj) => (
            <FDCarouselPoster key={uuidv4()} paginatedObj={paginatedObj} isGridLayout={isGridLayout} useFetchTrailer={useFetchTrailer} />
          ))}
        </ul>
        <FDCarouselOverlay setCarouselNavIndex={setCarouselNavIndex} mapObjMaxIndex={Math.ceil(tmdbDataArr[carouselNavIndex].value.length / visibleNodesCount)} />
      </div>
    </section>
  );
});

export default FDCarousel;

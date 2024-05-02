import { useEffect, RefObject, Dispatch, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Type_Tmdb_ApiCall_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import FDCarouselOverlay from './FDCarouselOverlay';
import FDCarouselPoster from './FDCarouselPoster';

type Type_PropDrill = {
  carouselUl: RefObject<HTMLUListElement>;
  visibleNodesCount: number;
  btnNavIndex: {
    prevIndex: number;
    currIndex: number;
  };
  setBtnNavIndex: Dispatch<
    SetStateAction<{
      prevIndex: number;
      currIndex: number;
    }>
  >;
  isGridLayout: boolean;
  tmdbDataObject: {
    key: string;
    label?: string | undefined;
    value: Type_Tmdb_ApiCall_Union[];
  };
  useFetchTrailer: (index: number) => void;
};

const FDCarousel = ({ carouselUl, btnNavIndex, setBtnNavIndex, visibleNodesCount, isGridLayout, tmdbDataObject, useFetchTrailer }: Type_PropDrill) => {
  /** INFINITE LOOP BUTTON NAVIGATION
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

  // Last possible index depends on visible nodes in carouselUl.current (visibleNodesCount)
  useEffect(() => {
    if (!isGridLayout) {
      const lastPossibleIndex: number = Math.ceil(tmdbDataObject.value.length / visibleNodesCount);

      if (carouselUl.current) {
        const posIndex = { isFirstIndex: btnNavIndex.currIndex === 1, isLastIndex: btnNavIndex.currIndex === lastPossibleIndex };
        let nextChildsIndex: number;

        switch (true) {
          case posIndex.isFirstIndex:
            nextChildsIndex = 0;
            break;

          case posIndex.isLastIndex:
            nextChildsIndex = tmdbDataObject.value.length - 1;
            break;

          default:
            nextChildsIndex = (btnNavIndex.currIndex - 1) * visibleNodesCount;
            break;
        }

        const carouselChildren: HTMLCollection = carouselUl.current.children;
        const nextChild = carouselChildren[nextChildsIndex] as HTMLLIElement;

        if (nextChild) {
          const scrollDistance: number = nextChild.offsetLeft - carouselUl.current.offsetLeft;
          carouselUl.current.scrollTo({ left: scrollDistance, behavior: 'smooth' });
        }
      }
    }
  }, [visibleNodesCount]);

  /** Component */
  const heading: string = tmdbDataObject.label ? tmdbDataObject.label : tmdbDataObject.key.replaceAll('_', ' ');

  return (
    <section className='fdMedia__carousel' key={uuidv4()} aria-label={`${heading} Section`}>
      <div className='fdMedia__carousel__header'>
        <h2 className='fdMedia__carousel__header--h2'>{heading}</h2>
      </div>
      <div className='fdMedia__carousel__wrapper'>
        <ul className='fdMedia__carousel__wrapper__ul' ref={carouselUl} data-layout={isGridLayout ? 'grid' : 'carousel'}>
          {tmdbDataObject.value.map((paginatedObj) => (
            <FDCarouselPoster key={uuidv4()} paginatedObj={paginatedObj} isGridLayout={isGridLayout} useFetchTrailer={useFetchTrailer} />
          ))}
        </ul>
        <FDCarouselOverlay tmdbArrLength={tmdbDataObject.value.length - 1} setBtnNavIndex={setBtnNavIndex} visibleNodesCount={visibleNodesCount} />
      </div>
    </section>
  );
};

export default FDCarousel;

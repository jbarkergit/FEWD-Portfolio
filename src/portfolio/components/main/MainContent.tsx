import { useEffect, useReducer, useRef, useState } from 'react';
import { initState } from './initial-state/initState';
import { actionType } from './types/actionType';
import { indexStateType } from './types/indexStateType';
import { initSliderStateType } from './types/initSliderStateType';
import { myProjects } from '../../assets/projects-data/myProjects';

const MainContent = ({ projectSlideIndex, setProjectSlideIndex }: indexStateType): JSX.Element => {
  /** References */
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const arrayOfArticles = useRef<HTMLElement[]>([]);

  const articleRef = (reference: HTMLElement) => {
    if (reference && !arrayOfArticles.current.includes(reference)) arrayOfArticles.current.push(reference);
  };

  /** Toggle Carousel 'Smooth' Animation (Native behavior by-pass) */
  const [smoothenCarousel, setSmoothenCarousel] = useState<boolean>(false);

  const toggleSmoothenAnimation = () => {
    setSmoothenCarousel((prev) => !prev);
    setTimeout(() => setSmoothenCarousel(false), 360);
  };

  /** Reference information variables */
  // Slider track width
  const targetElementWidth: number = carouselContainerRef.current?.scrollWidth as number;
  // Array of articles
  const targetElementChildrenArray: HTMLElement[] = Array.from(carouselContainerRef.current?.children ?? []) as HTMLElement[];
  // PX Positions of all articles
  const targetElementChildrenPositionArray: number[] = targetElementChildrenArray.map((child) => child.offsetLeft * -1);

  /** Reducer: slider logic */
  const reducer = (state: initSliderStateType, action: actionType): initSliderStateType => {
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageX: action.initPageX, pageX: action.pageX };

      case 'POINTER_MOVE':
        if (!state.pointerDown) {
          return state;
        } else {
          const pointerTravelDistance: number = action.pageX - state.initPageX,
            latestTrackPosition = state.previousTrackPos + pointerTravelDistance,
            targetElementLeftPadding: number = parseInt(window.getComputedStyle(carouselContainerRef.current as HTMLElement).paddingLeft),
            maximumDelta = targetElementWidth * -1 + (targetElementChildrenArray[1].offsetWidth + targetElementLeftPadding),
            clampedTrackPosition: number = Math.max(Math.min(latestTrackPosition, 0), maximumDelta);

          return { ...state, trackPos: clampedTrackPosition, style: { transform: `translateX(${clampedTrackPosition}px)` } };
        }

      case 'POINTER_LEAVE':
      case 'POINTER_UP':
        if (!state.pointerDown) {
          return state;
        } else {
          for (let i = 0; i < targetElementChildrenPositionArray.length; i++) {
            const distanceFromTrackPos = Math.abs(targetElementChildrenPositionArray[i] - state.trackPos);
            const previousIndex = Math.abs(targetElementChildrenPositionArray[state.closestIndex] - state.trackPos);
            if (distanceFromTrackPos < previousIndex) state.closestIndex = i;
          }
          const targetElementLeftPadding: number = parseInt(window.getComputedStyle(carouselContainerRef.current as HTMLElement).paddingLeft);
          const closestChild: number = targetElementChildrenPositionArray[state.closestIndex] + targetElementLeftPadding;

          arrayOfArticles.current.forEach((article, index) => {
            const dataStatus = index === state.closestIndex ? 'enabled' : 'disabled';
            if (article) article.setAttribute('data-status', dataStatus);
          });

          toggleSmoothenAnimation();

          return {
            ...state,
            pointerDown: false,
            trackPos: closestChild,
            previousTrackPos: closestChild,
            style: {
              transform: `translateX(${closestChild}px)`,
            },
          };
        }

      case 'SCROLL':
        const scrollDirection = Math.sign(action.deltaY);
        const targetElementLeftPadding: number = parseInt(window.getComputedStyle(carouselContainerRef.current as HTMLElement).paddingLeft);
        let nextClosestIndex = state.closestIndex;

        scrollDirection === -1
          ? (nextClosestIndex = Math.min(nextClosestIndex + 1, targetElementChildrenPositionArray.length - 1))
          : (nextClosestIndex = Math.max(nextClosestIndex - 1, 0));

        const closestChild: number = targetElementChildrenPositionArray[nextClosestIndex] + targetElementLeftPadding;

        arrayOfArticles.current.forEach((article, index) => {
          const dataStatus = index === nextClosestIndex ? 'enabled' : 'disabled';
          if (article) article.setAttribute('data-status', dataStatus);
        });

        toggleSmoothenAnimation();

        return {
          ...state,
          closestIndex: nextClosestIndex,
          trackPos: closestChild,
          previousTrackPos: closestChild,
          style: {
            transform: `translateX(${closestChild}px)`,
          },
        };

      case 'BUTTON_NAVIGATION':
        const targElementLeftPadding: number = parseInt(window.getComputedStyle(carouselContainerRef.current as HTMLElement).paddingLeft);
        const setSliderPosition: number = targetElementChildrenPositionArray[projectSlideIndex] + targElementLeftPadding;

        arrayOfArticles.current.forEach((article, index) => article.setAttribute('data-status', index === projectSlideIndex ? 'enabled' : 'disabled'));
        toggleSmoothenAnimation();

        return {
          ...state,
          closestIndex: projectSlideIndex,
          trackPos: setSliderPosition,
          previousTrackPos: setSliderPosition,
          style: {
            transform: `translateX(${setSliderPosition}px)`,
          },
        };

      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const userPointerDown = (e: PointerEvent) => {
      if (!state.pointerDown && e.target instanceof HTMLAnchorElement) return state;
      const pageX = e.pageX as number;
      dispatch({ type: 'POINTER_DOWN', pointerDown: true, initPageX: pageX, pageX: pageX });
    };

    const userPointerMove = (e: PointerEvent) => {
      const pageX = e.pageX as number;
      dispatch({
        type: 'POINTER_MOVE',
        pageX: pageX,
        pointerDown: state.pointerDown,
      });
    };

    const userPointerLeave = () => dispatch({ type: 'POINTER_LEAVE', pointerDown: false, previousTrackPos: state.trackPos });

    const userPointerUp = () => dispatch({ type: 'POINTER_UP', pointerDown: false, previousTrackPos: state.trackPos });

    const userWheelEvent = (e: WheelEvent) => {
      const targetElementChildrenPositionArray = targetElementChildrenArray.map((child) => child.offsetLeft * -1);
      dispatch({ type: 'SCROLL', deltaY: e.deltaY, targetElementChildrenPositionArray });
    };

    if (carouselContainerRef.current) {
      carouselContainerRef.current.addEventListener('pointerdown', userPointerDown);
      carouselContainerRef.current.addEventListener('pointermove', userPointerMove);
      carouselContainerRef.current.addEventListener('pointerleave', userPointerLeave);
      carouselContainerRef.current.addEventListener('pointerup', userPointerUp);
      carouselContainerRef.current.addEventListener('wheel', userWheelEvent);
    }

    return () => {
      if (carouselContainerRef.current) {
        carouselContainerRef.current.removeEventListener('pointerdown', userPointerDown);
        carouselContainerRef.current.removeEventListener('pointermove', userPointerMove);
        carouselContainerRef.current.removeEventListener('pointerleave', userPointerLeave);
        carouselContainerRef.current.removeEventListener('pointerup', userPointerUp);
        carouselContainerRef.current.removeEventListener('wheel', userWheelEvent);
      }
    };
  }, []);

  /** Index Tracker: current slide */
  useEffect(() => setProjectSlideIndex(state.closestIndex), [state.closestIndex]);

  /** Dispatch 'BUTTON_NAVIGATION' whenever projectSlideIndex changes */
  useEffect(() => {
    dispatch({ type: 'BUTTON_NAVIGATION' });
  }, [projectSlideIndex]);

  return (
    <main className={`mainContent ${smoothenCarousel ? 'smoothen' : ''}`} ref={carouselContainerRef} style={state.style}>
      {myProjects.map((project) => {
        return (
          <article className='mainContent__article' data-status={project.dataStatus} ref={articleRef} key={project.key}>
            <figure>
              <picture>
                <img src={project.projectImageSrc} alt={project.projectImageAlt} draggable='false' loading='lazy' decoding='async' fetchpriority='high' />
                <figcaption>{project.projectImageAlt}</figcaption>
              </picture>
            </figure>
          </article>
        );
      })}
    </main>
  );
};

export default MainContent;

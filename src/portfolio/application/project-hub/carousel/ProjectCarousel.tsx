import { useEffect, useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Component
import { indexStateType } from './types/indexStateType';
import { myProjects } from './../../../assets/projects-data/myProjects';

// Reducer
import { initSliderStateType } from './types/initSliderStateType';
import { actionType } from './types/actionType';
import { initState } from './initial-state/initState';

const ProjectCarousel = ({ projectSlideIndex, setProjectSlideIndex }: indexStateType): JSX.Element => {
  /** Mapped carousel children (<article />) references */
  const arrayOfArticles = useRef<HTMLElement[]>([]);
  const articleRef = (reference: HTMLElement) => {
    if (reference && !arrayOfArticles.current.includes(reference)) {
      arrayOfArticles.current.push(reference);
    }
  };

  /** Component References && Information Variables */
  const carouselContainerRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselVars, setCarouselVars] = useState({ leftPadding: 0, width: 0, maxTravelDelta: 0 });
  const arrayOfArticlePositions: number[] = arrayOfArticles.current.map((child) => child.offsetLeft * -1);

  useEffect(() => {
    const carouselLeftPadding: number = parseInt(window.getComputedStyle(carouselRef.current as HTMLDivElement).paddingLeft);
    const carouselWidth: number = carouselRef.current?.scrollWidth as number;
    const carouselMaxTravelDelta: number = carouselWidth * -1 + (arrayOfArticles.current[0].offsetWidth + carouselLeftPadding * 2 + 1);
    setCarouselVars({ leftPadding: carouselLeftPadding, width: carouselWidth, maxTravelDelta: carouselMaxTravelDelta });
  }, [carouselRef.current, arrayOfArticles.current]);

  /** Conditional rendering anchor urls */
  const [anchorUrl, setAnchorUrl] = useState<boolean>(true);

  /** Carousel 'smooth' animation */
  const [carouselAnimation, setCarouselAnimation] = useState<boolean>(false);

  function useCarouselSmoothAnimation() {
    setCarouselAnimation((prev) => !prev);
    setTimeout(() => setCarouselAnimation(false), 360);
  }

  /** Wheel Event Debouncer Flag */
  const [wheelEventActive, setWheelEventActive] = useState<boolean>(false);

  /** Reducer carousel logic */
  const reducer = (state: initSliderStateType, action: actionType): initSliderStateType => {
    /** Carousel children (<article />) transitional animations */
    function useCarouselChildrenAnimation(indexToCompare: number) {
      arrayOfArticles.current?.forEach((article, index) => {
        const animationStatus = index === indexToCompare ? 'enabled' : 'disabled';
        article?.setAttribute('data-status', animationStatus);
      });

      useCarouselSmoothAnimation();
    }

    /** Reducer cases */
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageX: action.initPageX, pageX: action.pageX };

      case 'POINTER_MOVE':
        if (state.pointerDown) {
          const pointerTravelDistance: number = action.pageX - state.initPageX;
          const latestTrackPosition: number = state.previousTrackPos + pointerTravelDistance;
          const clampedTrackPosition: number = Math.max(Math.min(latestTrackPosition, 0), carouselVars.maxTravelDelta);
          return { ...state, trackPos: clampedTrackPosition, style: { transform: `translateX(${clampedTrackPosition}px)` } };
        } else {
          return state;
        }

      case 'POINTER_LEAVE':
      case 'POINTER_UP':
        if (state.pointerDown) {
          for (let i = 0; i < arrayOfArticlePositions.length; i++) {
            const distanceFromTrackPos = Math.abs(arrayOfArticlePositions[i] - state.trackPos);
            const previousIndex = Math.abs(arrayOfArticlePositions[state.closestIndex] - state.trackPos);
            if (distanceFromTrackPos < previousIndex) state.closestIndex = i;
          }

          const closestChild: number = arrayOfArticlePositions[state.closestIndex] + carouselVars.leftPadding;

          useCarouselChildrenAnimation(state.closestIndex);

          return {
            ...state,
            pointerDown: false,
            trackPos: closestChild,
            previousTrackPos: closestChild,
            style: {
              transform: `translateX(${closestChild}px)`,
            },
          };
        } else {
          return state;
        }

      case 'WHEEL_SCROLL':
        if (!wheelEventActive) {
          const scrollWheelDirection: number = Math.sign(action.deltaY);
          const scrollDirections = { verticalUp: -1, veritcalDown: 1 };

          let nextClosestIndex: number = state.closestIndex;

          if (scrollWheelDirection === scrollDirections.verticalUp) {
            nextClosestIndex = Math.min(state.closestIndex + 1, arrayOfArticlePositions.length - 1);
          } else {
            if (scrollWheelDirection === scrollDirections.veritcalDown) {
              nextClosestIndex = Math.max(state.closestIndex - 1, 0);
            }
          }

          const closestIndex = nextClosestIndex;
          const closestChildPos: number = arrayOfArticlePositions[closestIndex] + carouselVars.leftPadding;

          setWheelEventActive(true);
          setTimeout(() => setWheelEventActive(false), 360);
          useCarouselChildrenAnimation(closestIndex);

          return {
            ...state,
            closestIndex: closestIndex,
            trackPos: closestChildPos,
            previousTrackPos: closestChildPos,
            style: {
              transform: `translateX(${closestChildPos}px)`,
            },
          };
        } else {
          return state;
        }

      case 'BUTTON_NAVIGATION':
        useCarouselChildrenAnimation(state.closestIndex);

        const newSliderPosition: number = arrayOfArticlePositions[state.closestIndex] + carouselVars.leftPadding;

        return {
          ...state,
          closestIndex: state.closestIndex,
          trackPos: newSliderPosition,
          previousTrackPos: newSliderPosition,
          style: {
            transform: `translateX(${newSliderPosition}px)`,
          },
        };

      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const userPointerDown = (e: PointerEvent) => {
      setAnchorUrl(true);
      dispatch({ type: 'POINTER_DOWN', pointerDown: true, initPageX: e.pageX as number, pageX: e.pageX as number });
    };

    const userPointerMove = (e: PointerEvent) => {
      setAnchorUrl(false);
      dispatch({
        type: 'POINTER_MOVE',
        pageX: e.pageX as number,
        pointerDown: state.pointerDown,
      });
    };

    const userPointerLeave = () => {
      setAnchorUrl(false);
      dispatch({ type: 'POINTER_LEAVE', pointerDown: false, previousTrackPos: state.trackPos });
    };

    const userPointerUp = () => dispatch({ type: 'POINTER_UP', pointerDown: false, previousTrackPos: state.trackPos });

    const userWheelEvent = (e: WheelEvent) => dispatch({ type: 'WHEEL_SCROLL', deltaY: e.deltaY });

    /** Event Listeners Mount */
    carouselContainerRef.current?.addEventListener('pointerdown', userPointerDown);
    carouselContainerRef.current?.addEventListener('pointermove', userPointerMove);
    carouselContainerRef.current?.addEventListener('pointerleave', userPointerLeave);
    carouselContainerRef.current?.addEventListener('pointerup', userPointerUp);
    carouselContainerRef.current?.addEventListener('wheel', userWheelEvent);
    /** Event Listeners Unmount */
    return () => {
      carouselContainerRef.current?.removeEventListener('pointerdown', userPointerDown);
      carouselContainerRef.current?.removeEventListener('pointermove', userPointerMove);
      carouselContainerRef.current?.removeEventListener('pointerleave', userPointerLeave);
      carouselContainerRef.current?.removeEventListener('pointerup', userPointerUp);
      carouselContainerRef.current?.removeEventListener('wheel', userWheelEvent);
    };
  }, []);

  /**
   * Note: projectSlideIndex is an external use index tracker
   * Functionality: When projectSlideIndex is changed externally, state.closestIndex is mutated
   * Note: Add new use cases to the same useEffect to minimalize hooks and define below
   * Use Case 0: Dispatch 'BUTTON_NAVIGATION' via <header />
   */

  useEffect(() => {
    state.closestIndex = projectSlideIndex;
    dispatch({ type: 'BUTTON_NAVIGATION' });
  }, [projectSlideIndex]);

  /**
   * Functionality: Update project information externally
   * Use Case 0: Footer Links
   * */

  useEffect(() => {
    setProjectSlideIndex(state.closestIndex);
  }, [state.closestIndex]);

  /** Component */
  return (
    <main className='mainContent' ref={carouselContainerRef}>
      <div className={`mainContent__track ${carouselAnimation ? 'smoothen' : ''}`} ref={carouselRef} style={state.style}>
        {myProjects.map((project) => {
          return (
            <article className='project' data-status={project.dataStatus} ref={articleRef} key={project.key}>
              <Link
                to={`${anchorUrl ? project.url : ''}`}
                onDragStart={(e) => {
                  e.preventDefault();
                }}
                onDrag={(e) => {
                  e.stopPropagation();
                }}>
                <figure>
                  <picture>
                    <img src={project.imgSrc} alt={project.imgAlt} rel='preload' loading='eager' draggable='false' decoding='async' fetchpriority='high' />
                    <figcaption>{project.imgAlt}</figcaption>
                  </picture>
                </figure>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default ProjectCarousel;

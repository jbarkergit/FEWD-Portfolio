import { useEffect, useReducer, useRef, useState } from 'react';
import { initState } from './initial-state/initState';
import { actionType } from './types/actionType';
import { indexStateType } from './types/indexStateType';
import { initSliderStateType } from './types/initSliderStateType';
import { myProjects } from '../../assets/projects-data/myProjects';
import { Link } from 'react-router-dom';

const MainContent = ({ mountAnimation, projectSlideIndex, setProjectSlideIndex }: indexStateType): JSX.Element => {
  /** Mapped article references */
  const arrayOfArticles = useRef<HTMLElement[]>([]);
  const articleRef = (reference: HTMLElement) => {
    if (reference && !arrayOfArticles.current.includes(reference)) arrayOfArticles.current.push(reference);
  };

  /** Mapped anchor element references */
  const arrayOfProjectAnchors: HTMLAnchorElement[] = [];
  const projectAnchorRef = (reference: HTMLAnchorElement) => {
    if (reference && !arrayOfProjectAnchors.includes(reference)) arrayOfProjectAnchors.push(reference);
  };

  /** State Toggles */
  // Conditional rendering anchor urls
  const [anchorUrl, setAnchorUrl] = useState<boolean>(true);
  // Toggle Carousel 'Smooth' Animation (Native behavior by-pass)
  const [smoothenCarousel, setSmoothenCarousel] = useState<boolean>(false);
  const toggleSmoothenAnimation = () => {
    setSmoothenCarousel((prev) => !prev);
    setTimeout(() => setSmoothenCarousel(false), 360);
  };

  /** Component References && Information Variables */
  const carouselContainerRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [carouselVars, setCarouselVars] = useState({ leftPadding: 0, width: 0, maxTravelDelta: 0 });

  useEffect(() => {
    const carouselLeftPadding: number = parseInt(window.getComputedStyle(carouselRef.current as HTMLDivElement).paddingLeft);
    const carouselWidth: number = carouselRef.current?.scrollWidth as number;
    const carouselMaxTravelDelta: number = carouselWidth * -1 + (arrayOfArticles.current[0].offsetWidth + carouselLeftPadding * 2 + 1);

    if (carouselRef.current && arrayOfArticles.current) {
      setCarouselVars({ leftPadding: carouselLeftPadding, width: carouselWidth, maxTravelDelta: carouselMaxTravelDelta });
    }
  }, [carouselRef.current, arrayOfArticles.current]);

  const arrayOfArticlePositions: number[] = arrayOfArticles.current.map((child) => child.offsetLeft * -1);

  /** Reducer: slider logic */
  const reducer = (state: initSliderStateType, action: actionType): initSliderStateType => {
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageX: action.initPageX, pageX: action.pageX };

      case 'POINTER_MOVE':
        if (!state.pointerDown) {
          return state;
        } else {
          const pointerTravelDistance: number = action.pageX - state.initPageX;
          const latestTrackPosition: number = state.previousTrackPos + pointerTravelDistance;
          const clampedTrackPosition: number = Math.max(Math.min(latestTrackPosition, 0), carouselVars.maxTravelDelta);
          return { ...state, trackPos: clampedTrackPosition, style: { transform: `translateX(${clampedTrackPosition}px)` } };
        }

      case 'POINTER_LEAVE':
      case 'POINTER_UP':
        if (!state.pointerDown) {
          return state;
        } else {
          for (let i = 0; i < arrayOfArticlePositions.length; i++) {
            const distanceFromTrackPos = Math.abs(arrayOfArticlePositions[i] - state.trackPos);
            const previousIndex = Math.abs(arrayOfArticlePositions[state.closestIndex] - state.trackPos);
            if (distanceFromTrackPos < previousIndex) state.closestIndex = i;
          }

          arrayOfArticles.current.forEach((article, index) => {
            const dataStatus = index === state.closestIndex ? 'enabled' : 'disabled';
            if (article) article.setAttribute('data-status', dataStatus);
          });

          toggleSmoothenAnimation();

          const closestChild: number = arrayOfArticlePositions[state.closestIndex] + carouselVars.leftPadding;

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
        let nextClosestIndex = state.closestIndex;

        scrollDirection === -1
          ? (nextClosestIndex = Math.min(nextClosestIndex + 1, arrayOfArticlePositions.length - 1))
          : (nextClosestIndex = Math.max(nextClosestIndex - 1, 0));

        arrayOfArticles.current.forEach((article, index) => {
          const dataStatus = index === nextClosestIndex ? 'enabled' : 'disabled';
          if (article) article.setAttribute('data-status', dataStatus);
        });

        toggleSmoothenAnimation();

        const closestChild: number = arrayOfArticlePositions[nextClosestIndex] + carouselVars.leftPadding;

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
        arrayOfArticles.current.forEach((article, index) => {
          article.setAttribute('data-status', index === projectSlideIndex ? 'enabled' : 'disabled');
        });

        toggleSmoothenAnimation();

        const setSliderPosition: number = arrayOfArticlePositions[projectSlideIndex] + carouselVars.leftPadding;

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

    const userWheelEvent = (e: WheelEvent) => dispatch({ type: 'SCROLL', deltaY: e.deltaY });

    /** Mount */
    carouselContainerRef.current?.addEventListener('pointerdown', userPointerDown);
    carouselContainerRef.current?.addEventListener('pointermove', userPointerMove);
    carouselContainerRef.current?.addEventListener('pointerleave', userPointerLeave);
    carouselContainerRef.current?.addEventListener('pointerup', userPointerUp);
    carouselContainerRef.current?.addEventListener('wheel', userWheelEvent);

    /** Unmount */
    return () => {
      carouselContainerRef.current?.removeEventListener('pointerdown', userPointerDown);
      carouselContainerRef.current?.removeEventListener('pointermove', userPointerMove);
      carouselContainerRef.current?.removeEventListener('pointerleave', userPointerLeave);
      carouselContainerRef.current?.removeEventListener('pointerup', userPointerUp);
      carouselContainerRef.current?.removeEventListener('wheel', userWheelEvent);
    };
  }, []);

  /** Index Tracker: current slide */
  useEffect(() => setProjectSlideIndex(state.closestIndex), [state.closestIndex]);

  /** Dispatch 'BUTTON_NAVIGATION' whenever projectSlideIndex changes */
  useEffect(() => dispatch({ type: 'BUTTON_NAVIGATION' }), [projectSlideIndex]);

  return (
    <main className={`mainContent ${mountAnimation ? 'data-mount-animation-fade-in' : ''}`} ref={carouselContainerRef}>
      <div className={`mainContent__track ${smoothenCarousel ? 'smoothen' : ''}`} ref={carouselRef} style={state.style}>
        {myProjects.map((project) => {
          return (
            <article className='project' data-status={project.dataStatus} ref={articleRef} key={project.key}>
              <Link
                to={`${anchorUrl ? project.projectUrl : ''}`}
                ref={projectAnchorRef}
                onDragStart={(e) => {
                  e.preventDefault();
                }}
                onDrag={(e) => {
                  e.stopPropagation();
                }}>
                <figure>
                  <picture>
                    <img src={project.projectImageSrc} alt={project.projectImageAlt} draggable='false' loading='lazy' decoding='async' fetchpriority='high' />
                    <figcaption>{project.projectImageAlt}</figcaption>
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

export default MainContent;

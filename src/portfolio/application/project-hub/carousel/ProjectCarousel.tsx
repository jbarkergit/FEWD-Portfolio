import { Dispatch, SetStateAction, useEffect, useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { myProjects } from '../../../assets/projects-data/myProjects';

/** useReducer Types & State */
type indexStateType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
};

type initSliderStateType = {
  pointerDown: boolean;
  initPageX: number;
  pageX: number;
  trackPos: number;
  previousTrackPos: number;
  closestIndex: number;
  style: React.CSSProperties;
};

const initState: initSliderStateType = {
  pointerDown: false,
  initPageX: 0,
  pageX: 0,
  trackPos: 0,
  previousTrackPos: 0,
  closestIndex: 0,
  style: { transform: `translateX(0px)` },
};

type actionType =
  | { type: 'POINTER_DOWN'; pointerDown: boolean; initPageX: number; pageX: number }
  | { type: 'POINTER_MOVE'; pointerDown: boolean; pageX: number }
  | { type: 'POINTER_LEAVE'; pointerDown: boolean; previousTrackPos: number }
  | { type: 'POINTER_UP'; pointerDown: boolean; previousTrackPos: number }
  | { type: 'WHEEL_SCROLL'; deltaY: number }
  | { type: 'BUTTON_NAVIGATION' };

/** Component */
const ProjectCarousel = ({ projectSlideIndex, setProjectSlideIndex }: indexStateType): JSX.Element => {
  /** External - Conditional rendering anchor urls */
  const [anchorUrl, setAnchorUrl] = useState<boolean>(true);

  /** useReducer Wheel Event Debouncer Flag */
  const [wheelEventActive, setWheelEventActive] = useState<boolean>(false);

  /** Carousel 'smooth' animation */
  const [carouselAnimation, setCarouselAnimation] = useState<boolean>(false);

  const useCarouselSmoothAnimation = () => {
    setCarouselAnimation((prev) => !prev);
    setTimeout(() => setCarouselAnimation(false), 360);
  };

  // 'smooth' animation envoker
  const useCarouselChildrenAnimation = (indexToCompare: number) => {
    arrayOfArticles.current?.forEach((article, index) => {
      const animationStatus = index === indexToCompare ? 'enabled' : 'disabled';
      article?.setAttribute('data-status', animationStatus);
    });

    useCarouselSmoothAnimation();
  };

  /** References */
  const carouselContainerRef = useRef<HTMLElement | null>(null); // Event Listeners
  const carouselRef = useRef<HTMLDivElement | null>(null); // Anything else

  const arrayOfArticles = useRef<HTMLElement[]>([]);
  const articleRef = (reference: HTMLElement) => {
    if (reference && !arrayOfArticles.current.includes(reference)) arrayOfArticles.current.push(reference);
  };

  /** Reducer */
  const reducer = (state: initSliderStateType, action: actionType): initSliderStateType => {
    const carouselWidth: number = carouselRef.current?.scrollWidth as number;
    const carouselLeftPadding: number = parseInt(window.getComputedStyle(carouselRef.current as HTMLDivElement).paddingLeft);

    const arrayOfArticlePositions: number[] = arrayOfArticles.current.map((child) => child.offsetLeft * -1);

    /** Reducer cases */
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageX: action.initPageX, pageX: action.pageX };

      case 'POINTER_MOVE':
        if (state.pointerDown) {
          const pointerTravelDistance: number = action.pageX - state.initPageX;
          const newTrackPosition: number = state.previousTrackPos + pointerTravelDistance;
          const maxTravelDelta: number = carouselWidth * -1 + (arrayOfArticles.current[0].offsetWidth + carouselLeftPadding * 2 + 1);
          const clampedTrackPosition: number = Math.max(Math.min(newTrackPosition, 0), maxTravelDelta);

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

          useCarouselChildrenAnimation(state.closestIndex);

          const closestChild: number = arrayOfArticlePositions[state.closestIndex] + carouselLeftPadding;

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
            if (scrollWheelDirection === scrollDirections.veritcalDown) nextClosestIndex = Math.max(state.closestIndex - 1, 0);
          }

          const closestChildPos: number = arrayOfArticlePositions[nextClosestIndex] + carouselLeftPadding;

          setWheelEventActive(true);
          setTimeout(() => setWheelEventActive(false), 360);
          useCarouselChildrenAnimation(nextClosestIndex);

          return {
            ...state,
            closestIndex: nextClosestIndex,
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
        const newSliderPosition: number = arrayOfArticlePositions[state.closestIndex] + carouselLeftPadding;

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

  /** Functionality: Update project information externally */
  useEffect(() => setProjectSlideIndex(state.closestIndex), [state.closestIndex]);

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

import { Dispatch, SetStateAction, useEffect, useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';
import { myProjects } from '../../../assets/projects-data/myProjects';

type PropDrillType = { projectSlideIndex: number; setProjectSlideIndex: Dispatch<SetStateAction<number>> };

/** useReducer Types */
type StateType = {
  activeSlideIndex: number;
  pointerDown: boolean;
  wheelEventActive: boolean;
  anchorEnabled: boolean;
  initPageX: number;
  pageX: number;
  trackPos: number;
  previousTrackPos: number;
  style: React.CSSProperties;
};

type ActionType =
  | { type: 'POINTER_DOWN'; pointerDown: boolean; initPageX: number; pageX: number }
  | { type: 'POINTER_MOVE'; anchorEnabled: boolean; pointerDown: boolean; pageX: number }
  | { type: 'POINTER_LEAVE'; anchorEnabled: boolean; pointerDown: boolean; previousTrackPos: number }
  | { type: 'POINTER_UP'; anchorEnabled: boolean; pointerDown: boolean; previousTrackPos: number }
  | { type: 'WHEEL_SCROLL'; deltaY: number; wheelEventActive: boolean }
  | { type: 'EXTERNAL_NAVIGATION' };

/** Component */
const ProjectCarousel = ({ projectSlideIndex, setProjectSlideIndex }: PropDrillType): JSX.Element => {
  /** References */
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const arrayOfArticles = useRef<HTMLElement[]>([]);
  const articleRef = (reference: HTMLElement) => {
    if (reference && !arrayOfArticles.current.includes(reference)) arrayOfArticles.current.push(reference);
  };

  /** useReducer State */
  const carouselState: StateType = {
    activeSlideIndex: 0,
    pointerDown: false,
    wheelEventActive: false,
    anchorEnabled: true,
    initPageX: 0,
    pageX: 0,
    previousTrackPos: 0,
    trackPos: 0,
    style: { transform: `translateX(0px)` },
  };

  /** Reducer */
  const reducer = (state: StateType, action: ActionType): StateType => {
    const carouselLeftPadding: number = parseInt(window.getComputedStyle(carouselRef.current as HTMLDivElement).paddingLeft);
    const arrayOfArticlePositions: number[] = arrayOfArticles.current.map((child) => child.offsetLeft * -1);
    const activeSlidePosition: number = arrayOfArticlePositions[projectSlideIndex];
    const activeSlidePositionWithPadding: number = activeSlidePosition + carouselLeftPadding;

    /** Reducer cases */
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageX: action.initPageX, pageX: action.pageX };

      case 'POINTER_MOVE':
        if (state.pointerDown) {
          const pointerTravelDistance: number = action.pageX - state.initPageX;
          const newTrackPosition: number = state.previousTrackPos + pointerTravelDistance;
          const maxTravelDelta: number = (carouselRef.current?.scrollWidth as number) * -1 + (arrayOfArticles.current[0].offsetWidth + carouselLeftPadding * 2 + 1);
          const clampedTrackPosition: number = Math.max(Math.min(newTrackPosition, 0), maxTravelDelta);
          return { ...state, trackPos: clampedTrackPosition, style: { transform: `translateX(${clampedTrackPosition}px)` } };
        } else {
          return state;
        }

      case 'POINTER_LEAVE':
      case 'POINTER_UP':
        if (state.pointerDown) {
          for (let i = 0; i < arrayOfArticlePositions.length; i++) {
            const slideDistanceIteration = Math.abs(arrayOfArticlePositions[i] - state.trackPos);
            const activeSlideDistance = Math.abs(activeSlidePosition - state.trackPos);
            if (slideDistanceIteration < activeSlideDistance) state.activeSlideIndex = i;
          }

          return {
            ...state,
            pointerDown: false,
            previousTrackPos: activeSlidePositionWithPadding,
            trackPos: activeSlidePositionWithPadding,
            style: {
              transform: `translateX(${activeSlidePositionWithPadding}px)`,
            },
          };
        } else {
          return state;
        }

      case 'WHEEL_SCROLL':
        setTimeout(() => (state.wheelEventActive = false), 360);

        if (!state.wheelEventActive) {
          const scrollWheelDirection: number = Math.sign(action.deltaY);
          const scrollYDirection = { verticalUp: -1, veritcalDown: 1 };

          let nextClosestIndex: number = state.activeSlideIndex;
          if (scrollWheelDirection === scrollYDirection.verticalUp) nextClosestIndex = Math.min(state.activeSlideIndex + 1, arrayOfArticlePositions.length - 1);
          if (scrollWheelDirection === scrollYDirection.veritcalDown) nextClosestIndex = Math.max(state.activeSlideIndex - 1, 0);

          const closestChildPos: number = arrayOfArticlePositions[nextClosestIndex] + carouselLeftPadding;

          return {
            ...state,
            activeSlideIndex: nextClosestIndex,
            wheelEventActive: true,
            previousTrackPos: closestChildPos,
            trackPos: closestChildPos,
            style: {
              transform: `translateX(${closestChildPos}px)`,
            },
          };
        } else {
          return state;
        }

      case 'EXTERNAL_NAVIGATION':
        return {
          ...state,
          activeSlideIndex: projectSlideIndex,
          previousTrackPos: activeSlidePositionWithPadding,
          trackPos: activeSlidePositionWithPadding,
          style: {
            transform: `translateX(${activeSlidePositionWithPadding}px)`,
          },
        };

      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, carouselState);

  /** Dispatch Actions */
  useEffect(() => {
    const userPointerDown = (e: PointerEvent) => {
      dispatch({ type: 'POINTER_DOWN', pointerDown: true, initPageX: e.pageX as number, pageX: e.pageX as number });
    };
    const userPointerMove = (e: PointerEvent) => {
      dispatch({ type: 'POINTER_MOVE', anchorEnabled: false, pointerDown: state.pointerDown, pageX: e.pageX as number });
    };
    const userPointerLeave = () => {
      dispatch({ type: 'POINTER_LEAVE', anchorEnabled: true, pointerDown: false, previousTrackPos: state.trackPos });
    };
    const userPointerUp = () => {
      dispatch({ type: 'POINTER_UP', anchorEnabled: true, pointerDown: false, previousTrackPos: state.trackPos });
    };
    const userWheelEvent = (e: WheelEvent) => {
      dispatch({ type: 'WHEEL_SCROLL', wheelEventActive: true, deltaY: e.deltaY });
    };

    carouselRef.current?.addEventListener('pointerdown', userPointerDown);
    carouselRef.current?.addEventListener('pointermove', userPointerMove);
    carouselRef.current?.addEventListener('pointerleave', userPointerLeave);
    carouselRef.current?.addEventListener('pointerup', userPointerUp);
    carouselRef.current?.addEventListener('wheel', userWheelEvent);

    return () => {
      carouselRef.current?.removeEventListener('pointerdown', userPointerDown);
      carouselRef.current?.removeEventListener('pointermove', userPointerMove);
      carouselRef.current?.removeEventListener('pointerleave', userPointerLeave);
      carouselRef.current?.removeEventListener('pointerup', userPointerUp);
      carouselRef.current?.removeEventListener('wheel', userWheelEvent);
    };
  }, []);

  /** Sync global active project index tracker and useReducer state */
  useEffect(() => {
    if (state.activeSlideIndex !== projectSlideIndex) dispatch({ type: 'EXTERNAL_NAVIGATION' });
  }, [projectSlideIndex]);

  useEffect(() => {
    if (projectSlideIndex !== state.activeSlideIndex) setProjectSlideIndex(state.activeSlideIndex);
  }, [state.activeSlideIndex]);

  /** Component */
  return (
    <main className='mainContent'>
      <div className='mainContent__track' ref={carouselRef} style={state.style} data-status={!state.pointerDown ? 'smoothen' : ''}>
        {myProjects.map((project, index) => (
          <article className='project' ref={articleRef} key={project.key} data-status={index === state.activeSlideIndex ? 'enabled' : 'disabled'}>
            <Link to={`${state.anchorEnabled ? project.url : ''}`} onDragStart={(e) => e.preventDefault()} onDrag={(e) => e.stopPropagation()}>
              <figure>
                <picture>
                  <img src={project.imgSrc} alt={project.imgAlt} rel='preload' loading='eager' draggable='false' decoding='async' fetchpriority='high' />
                  <figcaption>{project.imgAlt}</figcaption>
                </picture>
              </figure>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
};

export default ProjectCarousel;

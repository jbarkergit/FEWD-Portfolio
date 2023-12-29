import { Dispatch, SetStateAction, useEffect, useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';
import { myProjects } from '../../../data/projects/myProjects';
import { useCarouselSlideAnimator } from '../../../hooks/useCarouselSlideAnimator';

type PropDrillType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

/** useReducer Types */
type StateType = {
  activeSlideIndex: number;
  pointerDown: boolean;
  wheelEventActive: boolean;
  anchorEnabled: boolean;
  initPageX: number;
  pageX: number;
  initPageY: number;
  pageY: number;
  trackPos: number;
  previousTrackPos: number;
  trackStyle: React.CSSProperties;
};

type ActionType =
  | { type: 'POINTER_DOWN'; pointerDown: boolean; anchorEnabled: boolean; initPageX: number; pageX: number; initPageY: number; pageY: number }
  | { type: 'POINTER_MOVE'; pointerDown: boolean; anchorEnabled: boolean; pageX: number; pageY: number }
  | { type: 'POINTER_LEAVE'; pointerDown: boolean; anchorEnabled: boolean; previousTrackPos: number }
  | { type: 'POINTER_UP'; pointerDown: boolean; previousTrackPos: number }
  | { type: 'WHEEL_SCROLL'; deltaY: number; wheelEventActive: boolean }
  | { type: 'EXTERNAL_NAVIGATION' };

/** useReducer State */
const carouselState: StateType = {
  activeSlideIndex: 0,
  pointerDown: false,
  wheelEventActive: false,
  anchorEnabled: true,
  initPageX: 0,
  pageX: 0,
  initPageY: 0,
  pageY: 0,
  previousTrackPos: 0,
  trackPos: 0,
  trackStyle: { transform: `translateX(0px)` },
};

/** Component */
const ProjectCarousel = ({ projectSlideIndex, setProjectSlideIndex, featureState, setFeatureState }: PropDrillType): JSX.Element => {
  /** References */
  const mainRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const articleArray = useRef<HTMLElement[]>([]);
  const articleRef = (reference: HTMLElement) => {
    if (reference && !articleArray.current.includes(reference)) articleArray.current.push(reference);
  };

  /** Scale && Filter Hook */
  const useRemainderScaleAndFilter = (): void => {
    articleArray.current?.forEach((article: HTMLElement, index: number) => {
      article.setAttribute('data-status', 'smooth');

      setTimeout(() => {
        article.style.transform = index === state.activeSlideIndex ? `scale(${1})` : `scale(${0.8})`;
        article.style.filter = index === state.activeSlideIndex ? `grayscale(0%) sepia(0%) brightness(100%)` : `grayscale(85%) sepia(80) brightness(50%)`;
      }, 50);
    });
  };

  /** Reducer */
  const reducer = (state: StateType, action: ActionType): StateType => {
    const carouselLeftPadding: number = parseInt(window.getComputedStyle(carouselRef.current as HTMLDivElement).paddingLeft);
    const arrayOfArticlePositions: number[] = articleArray.current.map((child: HTMLElement) => child.offsetLeft * -1);
    const activeSlidePosition: number = arrayOfArticlePositions[projectSlideIndex];

    /** Reducer cases */
    switch (action.type) {
      case 'POINTER_DOWN':
        return {
          ...state,
          pointerDown: true,
          anchorEnabled: action.anchorEnabled,
          initPageX: action.initPageX,
          pageX: action.pageX,
          initPageY: action.initPageY,
          pageY: action.pageY,
        };

      case 'POINTER_MOVE':
        if (state.pointerDown) {
          // Calculate track position
          const pointerTravelDistance: number = action.pageX - state.initPageX;
          const newTrackPosition: number = state.previousTrackPos + pointerTravelDistance;
          const maxTravelDelta: number = (carouselRef.current?.scrollWidth as number) * -1 + (articleArray.current[0].offsetWidth + carouselLeftPadding * 2 + 1);
          const clampedTrackPosition: number = Math.max(Math.min(newTrackPosition, 0), maxTravelDelta);

          articleArray.current?.forEach((article: HTMLElement) => article.removeAttribute('data-status'));

          // Scale && Filter
          const styleDistancesArray: { scale: number; filter: string }[] = useCarouselSlideAnimator(mainRef, articleArray, true);

          articleArray.current?.forEach((article: HTMLElement, index: number) => {
            const styleDistances: { scale: number; filter: string } = styleDistancesArray[index];

            if (styleDistances) {
              article.style.transform = `scale(${styleDistances.scale})`;
              article.style.filter = styleDistances.filter;
            }
          });

          // State
          return {
            ...state,
            anchorEnabled: action.anchorEnabled,
            trackPos: clampedTrackPosition,
            trackStyle: { transform: `translateX(${clampedTrackPosition}px)` },
          };
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

          useRemainderScaleAndFilter();

          return {
            ...state,
            pointerDown: false,
            previousTrackPos: arrayOfArticlePositions[state.activeSlideIndex] + carouselLeftPadding,
            trackPos: arrayOfArticlePositions[state.activeSlideIndex] + carouselLeftPadding,
            trackStyle: {
              transform: `translateX(${arrayOfArticlePositions[state.activeSlideIndex] + carouselLeftPadding}px)`,
            },
          };
        } else {
          return state;
        }

      case 'WHEEL_SCROLL':
        setTimeout(() => (state.wheelEventActive = false), 360);

        if (!state.wheelEventActive && window.innerWidth > 1480) {
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
            trackStyle: {
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
          previousTrackPos: activeSlidePosition + carouselLeftPadding,
          trackPos: activeSlidePosition + carouselLeftPadding,
          trackStyle: {
            transform: `translateX(${activeSlidePosition + carouselLeftPadding}px)`,
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
      dispatch({
        type: 'POINTER_DOWN',
        anchorEnabled: true,
        pointerDown: true,
        initPageX: e.pageX as number,
        pageX: e.pageX as number,
        initPageY: e.pageY as number,
        pageY: e.pageY as number,
      });
    };
    const userPointerMove = (e: PointerEvent) => {
      dispatch({ type: 'POINTER_MOVE', anchorEnabled: false, pointerDown: state.pointerDown, pageX: e.pageX as number, pageY: e.pageY });
    };
    const userPointerLeave = () => {
      dispatch({ type: 'POINTER_LEAVE', anchorEnabled: true, pointerDown: false, previousTrackPos: state.trackPos });
    };
    const userPointerUp = () => {
      dispatch({ type: 'POINTER_UP', pointerDown: false, previousTrackPos: state.trackPos });
    };
    const userWheelEvent = (e: WheelEvent) => {
      dispatch({ type: 'WHEEL_SCROLL', wheelEventActive: true, deltaY: e.deltaY });
    };

    if (!Object.values(featureState).some((value: boolean) => value === true)) {
      carouselRef.current?.addEventListener('pointerdown', userPointerDown);
      carouselRef.current?.addEventListener('pointermove', userPointerMove);
      carouselRef.current?.addEventListener('pointerleave', userPointerLeave);
      carouselRef.current?.addEventListener('pointerup', userPointerUp);
      carouselRef.current?.addEventListener('wheel', userWheelEvent);
    }
    return () => {
      carouselRef.current?.removeEventListener('pointerdown', userPointerDown);
      carouselRef.current?.removeEventListener('pointermove', userPointerMove);
      carouselRef.current?.removeEventListener('pointerleave', userPointerLeave);
      carouselRef.current?.removeEventListener('pointerup', userPointerUp);
      carouselRef.current?.removeEventListener('wheel', userWheelEvent);
    };
  }, [featureState]);

  /** Slide Animator */
  useEffect(() => useRemainderScaleAndFilter(), [state.activeSlideIndex]);

  /** Sync global active project index tracker and useReducer state */
  useEffect(() => {
    if (state.activeSlideIndex !== projectSlideIndex) dispatch({ type: 'EXTERNAL_NAVIGATION' });
  }, [projectSlideIndex]);

  useEffect(() => {
    if (projectSlideIndex !== state.activeSlideIndex) setProjectSlideIndex(state.activeSlideIndex);
  }, [state.activeSlideIndex]);

  /** Grid transition */
  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (initialRender.current) initialRender.current = false;

    if (Object.values(featureState).some((value) => value === true)) {
      // Grid transition out animator
      mainRef.current?.setAttribute('data-status', 'disabled');
    } else if (!initialRender) {
      // Grid transition in animator
      setTimeout(() => mainRef.current?.setAttribute('data-status', 'active'), 1000);
    } else {
      // Mount animator
      mainRef.current?.setAttribute('data-status', 'active');
    }
  }, [featureState]);

  /** Component */
  return (
    <main className='mainContent' ref={mainRef}>
      <div className='mainContent__track' ref={carouselRef} style={state.trackStyle} data-status={!state.pointerDown ? 'smooth' : ''}>
        {myProjects.map((project) => (
          <article className='mainContent__track__project' ref={articleRef} key={project.key}>
            <Link
              to={state.anchorEnabled ? project.url : ''}
              aria-label={`${project.key} Demo Link`}
              onDragStart={(e) => e.preventDefault()}
              onDrag={(e) => e.stopPropagation()}>
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

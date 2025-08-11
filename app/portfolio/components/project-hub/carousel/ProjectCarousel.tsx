import { useEffect, useReducer, useRef } from 'react';
import { Link } from 'react-router';
import { useCarouselSlideAnimator } from '../../../hooks/useCarouselSlideAnimator';
import { projectData } from '../../../data/projectData';
import { usePortfolioContext } from '~/portfolio/context/PortfolioContext';

const ProjectCarousel = () => {
  const { projectSlideIndex, setProjectSlideIndex, featureState } = usePortfolioContext();

  /** References */
  const mainRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const articleArray = useRef<HTMLElement[]>([]);
  const articleRef = (reference: HTMLDivElement) => {
    if (reference && !articleArray.current.includes(reference)) articleArray.current.push(reference);
  };

  /** Scale && Filter Hook */
  const animateSlide = (): void => {
    articleArray.current?.forEach((article: HTMLElement, index: number) => {
      article.setAttribute('data-status', 'smooth');

      setTimeout(() => {
        article.style.transform = index === state.activeSlideIndex ? `scale(${1})` : `scale(${0.8})`;
        article.style.filter =
          index === state.activeSlideIndex
            ? `grayscale(0%) sepia(0%) brightness(100%)`
            : `grayscale(85%) sepia(80%) brightness(50%)`;
      }, 50);
    });
  };

  /** Reducer */
  const initState = {
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

  type state = typeof initState;

  type ActionType =
    | {
        type: 'POINTER_DOWN';
        payload: { anchorEnabled: boolean; initPageX: number; pageX: number; initPageY: number; pageY: number };
      }
    | { type: 'POINTER_MOVE'; payload: { anchorEnabled: boolean; pageX: number; pageY: number } }
    | { type: 'POINTER_LEAVE'; payload: { anchorEnabled: boolean; previousTrackPos: number } }
    | { type: 'POINTER_UP'; payload: { previousTrackPos: number } }
    | { type: 'WHEEL_SCROLL'; payload: { deltaY: number } }
    | { type: 'EXTERNAL_NAVIGATION' };

  const reducer = (state: state, action: ActionType): state => {
    const carouselLeftPadding: number = parseInt(
      window.getComputedStyle(carouselRef.current as HTMLDivElement).paddingLeft
    );
    const arrayOfArticlePositions: number[] = articleArray.current.map((child: HTMLElement) => child.offsetLeft * -1);
    const activeSlidePosition: number = arrayOfArticlePositions[projectSlideIndex];

    /** Reducer cases */
    switch (action.type) {
      case 'POINTER_DOWN':
        return {
          ...state,
          pointerDown: true,
          anchorEnabled: action.payload.anchorEnabled,
          initPageX: action.payload.initPageX,
          pageX: action.payload.pageX,
          initPageY: action.payload.initPageY,
          pageY: action.payload.pageY,
        };

      case 'POINTER_MOVE':
        if (state.pointerDown) {
          // Calculate track position
          const pointerTravelDistance: number = action.payload.pageX - state.initPageX;
          const newTrackPosition: number = state.previousTrackPos + pointerTravelDistance;
          const maxTravelDelta: number =
            (carouselRef.current?.scrollWidth as number) * -1 +
            (articleArray.current[0].offsetWidth + carouselLeftPadding * 2);
          const clampedTrackPosition: number = Math.max(Math.min(newTrackPosition, 0), maxTravelDelta);

          articleArray.current?.forEach((article: HTMLElement) => article.removeAttribute('data-status'));

          // Scale && Filter
          const styleDistancesArray: { scale: number; filter: string }[] = useCarouselSlideAnimator(
            mainRef,
            articleArray,
            true
          );

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
            anchorEnabled: action.payload.anchorEnabled,
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

          animateSlide();

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
          const scrollWheelDirection: number = Math.sign(action.payload.deltaY);
          const scrollYDirection = { verticalUp: -1, veritcalDown: 1 };

          let nextClosestIndex: number = state.activeSlideIndex;
          if (scrollWheelDirection === scrollYDirection.verticalUp)
            nextClosestIndex = Math.min(state.activeSlideIndex + 1, arrayOfArticlePositions.length - 1);
          if (scrollWheelDirection === scrollYDirection.veritcalDown)
            nextClosestIndex = Math.max(state.activeSlideIndex - 1, 0);

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

  const [state, dispatch] = useReducer(reducer, initState);

  /** Dispatch Actions */
  useEffect(() => {
    const userPointerDownHandler = (e: PointerEvent): void => {
      dispatch({
        type: 'POINTER_DOWN',
        payload: {
          anchorEnabled: true,
          initPageX: e.pageX as number,
          pageX: e.pageX as number,
          initPageY: e.pageY as number,
          pageY: e.pageY as number,
        },
      });
    };

    const userPointerMoveHandler = (e: PointerEvent): void => {
      dispatch({
        type: 'POINTER_MOVE',
        payload: { anchorEnabled: false, pageX: e.pageX as number, pageY: e.pageY },
      });
    };

    const userPointerLeaveHandler = (): void => {
      dispatch({
        type: 'POINTER_LEAVE',
        payload: { anchorEnabled: true, previousTrackPos: state.trackPos },
      });
    };

    const userPointerUpHandler = (): void => {
      dispatch({
        type: 'POINTER_UP',
        payload: { previousTrackPos: state.trackPos },
      });
    };

    const userWheelEventHandler = (e: WheelEvent): void => {
      dispatch({
        type: 'WHEEL_SCROLL',
        payload: { deltaY: e.deltaY },
      });
    };

    if (carouselRef.current && !Object.values(featureState).some((value: boolean) => value === true)) {
      carouselRef.current.addEventListener('pointerdown', userPointerDownHandler);
      carouselRef.current.addEventListener('pointermove', userPointerMoveHandler);
      carouselRef.current.addEventListener('pointerleave', userPointerLeaveHandler);
      carouselRef.current.addEventListener('pointerup', userPointerUpHandler);
      carouselRef.current.addEventListener('wheel', userWheelEventHandler);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('pointerdown', userPointerDownHandler);
        carouselRef.current.removeEventListener('pointermove', userPointerMoveHandler);
        carouselRef.current.removeEventListener('pointerleave', userPointerLeaveHandler);
        carouselRef.current.removeEventListener('pointerup', userPointerUpHandler);
        carouselRef.current.removeEventListener('wheel', userWheelEventHandler);
      }
    };
  }, [featureState]);

  /** Slide Animator */
  useEffect(() => animateSlide(), [state.activeSlideIndex]);

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
      const entryWithTrue = Object.entries(featureState).find(([key, value]) => value === true);
      const trueKey = entryWithTrue ? entryWithTrue[0] : null;
      mainRef.current?.setAttribute('data-status', trueKey === 'projectDetailsActive' ? 'disabled' : 'contact');
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
    <main
      className='mainContent'
      ref={mainRef}>
      <div
        className='mainContent__track'
        ref={carouselRef}
        style={state.trackStyle}
        data-status={!state.pointerDown ? 'smooth' : ''}>
        {projectData.map((project) => (
          <div
            className='mainContent__track__project'
            ref={articleRef}
            key={project.key}>
            <Link
              to={state.anchorEnabled ? project.url : '/'}
              aria-label={`${project.key} Live Demo`}
              onDragStart={(e) => e.preventDefault()}
              onDrag={(e) => e.stopPropagation()}>
              <picture>
                <img
                  src={project.imgSrc}
                  alt={project.imgAlt}
                  rel='preload'
                  loading='eager'
                  draggable='false'
                  decoding='async'
                  fetchPriority='high'
                />
              </picture>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProjectCarousel;

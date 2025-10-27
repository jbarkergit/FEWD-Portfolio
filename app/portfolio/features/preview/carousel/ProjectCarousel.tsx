import { useEffect, useReducer, useRef, type RefObject } from 'react';
import { Link } from 'react-router';
import { useFeatureState } from '~/portfolio/context/FeatureStateContext';
import { useProjectSlideIndex } from '~/portfolio/context/ProjectSlideContext';
import { projectData } from '~/portfolio/data/projectData';

type ActionType =
  | {
      type: 'POINTER_DOWN';
      payload: { anchorEnabled: boolean; initPageX: number; pageX: number; initPageY: number; pageY: number };
    }
  | {
      type: 'POINTER_MOVE';
      payload: { anchorEnabled: boolean; pageX: number; pageY: number; carouselLeftPadding: number };
    }
  | {
      type: 'POINTER_LEAVE';
      payload: {
        anchorEnabled: boolean;
        previousTrackPos: number;
        articlePositions: number[];
        activeArticlePosition: number | undefined;
        carouselLeftPadding: number;
      };
    }
  | {
      type: 'POINTER_UP';
      payload: {
        previousTrackPos: number;
        articlePositions: number[];
        activeArticlePosition: number | undefined;
        carouselLeftPadding: number;
      };
    }
  | { type: 'WHEEL_SCROLL'; payload: { deltaY: number; articlePositions: number[]; carouselLeftPadding: number } }
  | {
      type: 'EXTERNAL_NAVIGATION';
      payload: {
        activeArticlePosition: number | undefined;
        carouselLeftPadding: number;
      };
    }
  | { type: 'RESET_WHEEL_ACTIVE'; payload: { wheelEventActive: boolean } };

type StyleDistances = {
  scale: number;
  filter: string;
};

const initState = {
  activeArticleIndex: 0,
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

const ProjectCarousel = () => {
  const { featureState } = useFeatureState();
  const { projectSlideIndex, setProjectSlideIndex } = useProjectSlideIndex();

  /** References */
  const mainRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const articleArray = useRef<HTMLAnchorElement[]>([]);

  const articleRef = (reference: HTMLAnchorElement) => {
    if (reference && !articleArray.current.includes(reference)) {
      articleArray.current.push(reference);
    }
  };

  /** Reducer */
  const reducer = (state: typeof initState, action: ActionType): typeof initState => {
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
        if (!state.pointerDown) return state;

        const pointerTravelDistance: number = action.payload.pageX - state.initPageX;
        const newTrackPosition: number = state.previousTrackPos + pointerTravelDistance;

        const carouselScrollWidth: number = (carouselRef.current?.scrollWidth as number) * -1;
        const articleSample = articleArray.current[0];
        if (!articleSample) return state;
        const articleOffsetWidth: number = articleSample.offsetWidth + action.payload.carouselLeftPadding * 2;

        const maxTravelDelta: number = carouselScrollWidth + articleOffsetWidth;
        const clampedTrackPosition: number = Math.max(Math.min(newTrackPosition, 0), maxTravelDelta);

        return {
          ...state,
          anchorEnabled: action.payload.anchorEnabled,
          trackPos: clampedTrackPosition,
          trackStyle: { transform: `translateX(${clampedTrackPosition}px)` },
        };

      case 'POINTER_UP':
      case 'POINTER_LEAVE':
        if (!state.pointerDown) return state;

        const distances = action.payload.articlePositions.map((pos) => Math.abs(pos - state.trackPos));
        const closestIndex = distances.indexOf(Math.min(...distances));
        const closestArticle = action.payload.articlePositions[closestIndex];
        if (!closestArticle) return state;
        const closestPos = closestArticle + action.payload.carouselLeftPadding;

        return {
          ...state,
          pointerDown: false,
          activeArticleIndex: closestIndex,
          previousTrackPos: closestPos,
          trackPos: closestPos,
          trackStyle: { transform: `translateX(${closestPos}px)` },
        };

      case 'WHEEL_SCROLL':
        if (!state.wheelEventActive && window.innerWidth > 1480) {
          const scrollWheelDirection: number = Math.sign(action.payload.deltaY);
          const scrollYDirection = { verticalUp: -1, veritcalDown: 1 };

          let nextClosestIndex: number = state.activeArticleIndex;

          if (scrollWheelDirection === scrollYDirection.verticalUp) {
            nextClosestIndex = Math.min(state.activeArticleIndex + 1, action.payload.articlePositions.length - 1);
          }

          if (scrollWheelDirection === scrollYDirection.veritcalDown) {
            nextClosestIndex = Math.max(state.activeArticleIndex - 1, 0);
          }

          const closestChild = action.payload.articlePositions[nextClosestIndex];
          if (!closestChild) return state;
          const closestChildPos: number = closestChild + action.payload.carouselLeftPadding;

          return {
            ...state,
            activeArticleIndex: nextClosestIndex,
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
        if (!action.payload.activeArticlePosition) return state;
        return {
          ...state,
          activeArticleIndex: projectSlideIndex,
          previousTrackPos: action.payload.activeArticlePosition + action.payload.carouselLeftPadding,
          trackPos: action.payload.activeArticlePosition + action.payload.carouselLeftPadding,
          trackStyle: {
            transform: `translateX(${action.payload.activeArticlePosition + action.payload.carouselLeftPadding}px)`,
          },
        };

      case 'RESET_WHEEL_ACTIVE':
        return { ...state, wheelEventActive: false };

      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  /** Dispatch Actions */
  const getCarouselLeftPadding = (): number =>
    parseInt(window.getComputedStyle(carouselRef.current as HTMLDivElement).paddingLeft);
  const getArticlePositions = (): number[] => articleArray.current.map((child: HTMLElement) => child.offsetLeft * -1);
  const getActiveArticlePosition = (): number | undefined => getArticlePositions()[projectSlideIndex];

  let pointerDownTimer: NodeJS.Timeout | null = null;

  const userPointerDownHandler = (e: PointerEvent): void => {
    if (pointerDownTimer) clearTimeout(pointerDownTimer);

    pointerDownTimer = setTimeout(() => {
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
    }, 40);
  };

  const userPointerMoveHandler = (e: PointerEvent): void => {
    dispatch({
      type: 'POINTER_MOVE',
      payload: {
        anchorEnabled: false,
        pageX: e.pageX as number,
        pageY: e.pageY,
        carouselLeftPadding: getCarouselLeftPadding(),
      },
    });
  };

  const cancelPointerDown = () => {
    if (pointerDownTimer) {
      clearTimeout(pointerDownTimer);
      pointerDownTimer = null;
    }
  };

  const userPointerLeaveHandler = (): void => {
    cancelPointerDown();
    dispatch({
      type: 'POINTER_LEAVE',
      payload: {
        anchorEnabled: true,
        previousTrackPos: state.trackPos,
        articlePositions: getArticlePositions(),
        activeArticlePosition: getActiveArticlePosition(),
        carouselLeftPadding: getCarouselLeftPadding(),
      },
    });
  };

  const userPointerUpHandler = (): void => {
    cancelPointerDown();
    dispatch({
      type: 'POINTER_UP',
      payload: {
        previousTrackPos: state.trackPos,
        articlePositions: getArticlePositions(),
        activeArticlePosition: getActiveArticlePosition(),
        carouselLeftPadding: getCarouselLeftPadding(),
      },
    });
  };

  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const userWheelEventHandler = (e: WheelEvent) => {
    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);

    dispatch({
      type: 'WHEEL_SCROLL',
      payload: {
        deltaY: e.deltaY,
        articlePositions: getArticlePositions(),
        carouselLeftPadding: getCarouselLeftPadding(),
      },
    });

    wheelTimeout.current = setTimeout(() => {
      dispatch({ type: 'RESET_WHEEL_ACTIVE', payload: { wheelEventActive: false } });
      wheelTimeout.current = null;
    }, 360);
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel && !Object.values(featureState).some((value: boolean) => value === true)) {
      carousel.addEventListener('pointerdown', userPointerDownHandler);
      carousel.addEventListener('pointermove', userPointerMoveHandler);
      carousel.addEventListener('pointerleave', userPointerLeaveHandler);
      carousel.addEventListener('pointerup', userPointerUpHandler);
      carousel.addEventListener('wheel', userWheelEventHandler);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('pointerdown', userPointerDownHandler);
        carousel.removeEventListener('pointermove', userPointerMoveHandler);
        carousel.removeEventListener('pointerleave', userPointerLeaveHandler);
        carousel.removeEventListener('pointerup', userPointerUpHandler);
        carousel.removeEventListener('wheel', userWheelEventHandler);
      }
      cancelPointerDown();
    };
  }, [featureState]);

  /** Sync projectSlideIndex from context with useReducer state for header project navigation */
  useEffect(() => {
    if (state.activeArticleIndex !== projectSlideIndex) {
      dispatch({
        type: 'EXTERNAL_NAVIGATION',
        payload: { activeArticlePosition: getActiveArticlePosition(), carouselLeftPadding: getCarouselLeftPadding() },
      });
    }
  }, [projectSlideIndex]);

  useEffect(() => {
    if (projectSlideIndex !== state.activeArticleIndex) {
      setProjectSlideIndex(state.activeArticleIndex);
    }
  }, [state.activeArticleIndex]);

  /** Looped carousel article animator */
  const getCarouselSlideFX = (): StyleDistances[] => {
    let styleDists: StyleDistances[] = [];

    // Logic
    if (mainRef.current && articleArray.current) {
      const carouselSliderWidth: number = mainRef.current.clientWidth as number;

      for (const slide of articleArray.current) {
        // Resize Slides
        const slideBound: DOMRect = slide.getBoundingClientRect();
        const slideCenterX: number = slideBound.right - slideBound.width / 2;
        const slideDistanceFromViewport = Math.abs(slideCenterX - carouselSliderWidth / 2);
        const containerDimensions = carouselSliderWidth;
        const carouselPadding = getCarouselLeftPadding();

        const scale: Record<'filterMinimum' | 'filterMaximum' | 'maximumDistance' | 'scaleExponent', number> = {
          filterMinimum: 0.8,
          filterMaximum: 1,
          maximumDistance: containerDimensions / 2 + carouselPadding,
          scaleExponent: 2,
        } as const;

        const scaleDistanceRatio = slideDistanceFromViewport / scale.maximumDistance; // How far the slide is from the maximum distance
        const scaledDistance = Math.pow(scaleDistanceRatio, scale.scaleExponent); // Scale distance value
        const scaleRangeDifference = scale.filterMaximum - scale.filterMinimum; // Scale range difference
        const newScaleValue = scale.filterMinimum + scaleRangeDifference * (1 - scaledDistance); // New scale value
        const scaleFilterClamp = Math.min(scale.filterMaximum, Math.max(scale.filterMinimum, newScaleValue)); // Clamped scale value

        /** Calculate filter intensity: distance between slide and viewport center */
        const filterIntensity: number =
          (scaleFilterClamp - scale.filterMinimum) / (scale.filterMaximum - scale.filterMinimum);

        const saturationFilter: Record<'grayscale' | 'sepia' | 'brightness', number> = {
          grayscale: 85 - filterIntensity * 85,
          sepia: 80 - filterIntensity * 80,
          brightness: 50 - filterIntensity * 50 * -1,
        };

        /** Calculate scale && filter data, store */
        const styleDistances: StyleDistances = {
          scale: scaleFilterClamp,
          filter: `grayscale(${Math.abs(saturationFilter.grayscale)}%) sepia(${Math.abs(saturationFilter.sepia)}%) brightness(${Math.abs(
            saturationFilter.brightness
          )}%)`,
        };

        styleDists.push(styleDistances);
      }
    }

    return styleDists;
  };

  const animationRef = useRef<number | null>(null);

  const animateLoop = (): void => {
    const styleDistancesArray: StyleDistances[] = getCarouselSlideFX();

    for (let i = 0; i < articleArray.current.length; i++) {
      const article = articleArray.current[i];
      const targetStyle = styleDistancesArray[i];

      if (article && targetStyle) {
        const currentScale = parseFloat(article.style.transform.replace(/scale\((.+)\)/, '$1')) || targetStyle.scale; // Parse inline style or default to target
        const lerpedScale = currentScale + (targetStyle.scale - currentScale) * 0.1; // Smooth interpolation

        // Apply interpolated transform and filter
        article.style.transform = `scale(${lerpedScale})`;
        article.style.filter = targetStyle.filter;
      }
    }

    animationRef.current = requestAnimationFrame(animateLoop); // Schedule next frame
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateLoop); // Start loop

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  /** Mount animation */
  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      carouselRef.current?.setAttribute('data-visible', 'true');
    }
  }, []);

  useEffect(() => {
    if (Object.values(featureState).some((value) => value === true)) {
      const entryWithTrue = Object.entries(featureState).find(([key, value]) => value === true);
      const trueKey = entryWithTrue ? entryWithTrue[0] : null;
      mainRef.current?.setAttribute('data-status', trueKey === 'projectDetailsActive' ? 'disabled' : 'contact'); // Grid transition out animator
    } else if (!initialRender) {
      setTimeout(() => mainRef.current?.setAttribute('data-status', 'active'), 1000); // Grid transition in animator
    } else {
      mainRef.current?.setAttribute('data-status', 'active'); // Mount animator
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
        data-visible={'false'}
        data-status={!state.pointerDown ? 'smooth' : ''}>
        {projectData.map((project) => (
          <Link
            className='mainContent__track__project'
            ref={articleRef}
            // To prevent navigation dupes due to use of the map method we have to force the string as an absolute as opposed to relative by utilizing a string method
            to={`/${project.url.toLowerCase()}`}
            aria-label={`${project.key} Live Demo`}
            key={project.key}
            onClick={(e) => {
              if (!state.anchorEnabled) e.preventDefault();
            }}
            onDragStart={(e) => e.preventDefault()}>
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
        ))}
      </div>
    </main>
  );
};

export default ProjectCarousel;

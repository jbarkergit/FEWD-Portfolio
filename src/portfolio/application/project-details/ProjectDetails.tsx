import { Dispatch, SetStateAction, useEffect, useReducer, useRef } from 'react';
import { myProjects } from '../../assets/projects-data/myProjects';
import { useCarouselSlideAnimator } from '../../hooks/useCarouselSlideAnimator';

type PropDrillType = { projectSlideIndex: number; setProjectSlideIndex: Dispatch<SetStateAction<number>> };

/** useReducer Types */
type StateType = {
  activeSlideIndex: number;
  pointerDown: boolean;
  initPageY: number;
  pageY: number;
  prevTrackPos: number;
  trackPos: number;
  style: React.CSSProperties;
};

type ActionType =
  | { type: 'POINTER_DOWN'; pointerDown: boolean; initPageY: number; pageY: number }
  | { type: 'POINTER_MOVE'; pageY: number }
  | { type: 'POINTER_LEAVE'; pointerDown: boolean; previousTrackPos: number }
  | { type: 'POINTER_UP'; pointerDown: boolean; previousTrackPos: number }
  | { type: 'SET_INITIAL_STATE'; initialPosition: number };

/** Component */
const ProjectDetails = ({ projectSlideIndex, setProjectSlideIndex }: PropDrillType) => {
  /** Carousel References */
  const carousel = useRef<HTMLDivElement>(null);
  const carouselSlider = useRef<HTMLDivElement>(null);

  const carouselSlides = useRef<HTMLElement[]>([]);
  const carouselSlide = (reference: HTMLElement) => {
    if (reference && !carouselSlides.current.includes(reference)) carouselSlides.current.push(reference);
  };
  const slidePositionsArray: number[] = carouselSlides.current?.map((slide: HTMLElement) => slide.offsetTop * -1) || [];

  /** Page scroll anywhere references */
  const projectDetails = useRef<HTMLElement>(null);
  const insights = useRef<HTMLElement>(null);

  /** useReducer State */
  const carouselState: StateType = {
    activeSlideIndex: projectSlideIndex,
    pointerDown: false,
    initPageY: 0,
    pageY: 0,
    prevTrackPos: 0,
    trackPos: 0,
    style: { transform: `translateY(${0}px)` },
  };

  /** Reducer */
  const reducer = (state: StateType, action: ActionType): StateType => {
    const carouselTopPadding: number = parseInt(window.getComputedStyle(carousel.current as HTMLElement).paddingTop);

    switch (action.type) {
      case 'SET_INITIAL_STATE':
        return {
          ...state,
          activeSlideIndex: projectSlideIndex,
          prevTrackPos: action.initialPosition,
          trackPos: action.initialPosition,
          style: { transform: `translateY(${action.initialPosition}px)` },
        };

      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageY: action.initPageY, pageY: action.pageY };

      case 'POINTER_MOVE':
        if (state.pointerDown) {
          const carouselSliderHeight: number = carouselSlider.current?.scrollHeight as number;
          const pointerTravelDistance: number = action.pageY - state.initPageY;
          const newTrackPosition: number = state.prevTrackPos + pointerTravelDistance;
          const travelDelta: number = carouselSliderHeight / 2 + carouselTopPadding * 2;
          const clampedTrackPosition: number = Math.max(Math.min(newTrackPosition, travelDelta), travelDelta * -1);

          useCarouselSlideAnimator(carousel, carouselSlides, false);
          return { ...state, trackPos: clampedTrackPosition, style: { transform: `translateY(${clampedTrackPosition}px)` } };
        } else {
          return state;
        }

      case 'POINTER_LEAVE':
      case 'POINTER_UP':
        if (state.pointerDown) {
          for (let i = 0; i < slidePositionsArray.length; i++) {
            const slideDistanceIteration = Math.abs(slidePositionsArray[i] - state.trackPos);
            const activeSlideDistance = Math.abs(slidePositionsArray[state.activeSlideIndex] - state.trackPos);
            if (slideDistanceIteration < activeSlideDistance) state.activeSlideIndex = i;
          }
          const newSliderPosition: number = slidePositionsArray[state.activeSlideIndex] - carouselTopPadding * 2 + carouselSlides.current[0]?.offsetHeight / 2;

          useCarouselSlideAnimator(carousel, carouselSlides, false);
          return {
            ...state,
            pointerDown: false,
            prevTrackPos: newSliderPosition,
            trackPos: newSliderPosition,
            style: { transform: `translateY(${newSliderPosition}px)` },
          };
        } else {
          return state;
        }

      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, carouselState);

  /** Dispatch Actions */
  useEffect(() => {
    const userPointerDown = (e: PointerEvent) => {
      dispatch({ type: 'POINTER_DOWN', pointerDown: true, initPageY: e.pageY, pageY: e.pageY });
    };
    const userPointerMove = (e: PointerEvent) => {
      dispatch({ type: 'POINTER_MOVE', pageY: e.pageY });
    };
    const userPointerLeave = () => {
      dispatch({ type: 'POINTER_LEAVE', pointerDown: false, previousTrackPos: state.trackPos });
    };
    const userPointerUp = () => {
      dispatch({ type: 'POINTER_UP', pointerDown: false, previousTrackPos: state.trackPos });
    };
    const useInsightScroll = (e: WheelEvent) => {
      insights.current?.scrollBy({ top: e.deltaY, behavior: 'smooth' });
    };

    carousel.current?.addEventListener('pointerdown', userPointerDown);
    carousel.current?.addEventListener('pointermove', userPointerMove);
    carousel.current?.addEventListener('pointerleave', userPointerLeave);
    carousel.current?.addEventListener('pointerup', userPointerUp);
    projectDetails.current?.addEventListener('wheel', useInsightScroll);

    return () => {
      carousel.current?.removeEventListener('pointerdown', userPointerDown);
      carousel.current?.removeEventListener('pointermove', userPointerMove);
      carousel.current?.removeEventListener('pointerleave', userPointerLeave);
      carousel.current?.removeEventListener('pointerup', userPointerUp);
      projectDetails.current?.removeEventListener('wheel', useInsightScroll);
    };
  }, []);

  /** Dispatch initial useReducer state action && Update carouselState when projectSlideIndex is altered */
  useEffect(() => {
    const carouselTopPadding: number = parseInt(window.getComputedStyle(carousel.current as HTMLElement).paddingTop);

    dispatch({
      type: 'SET_INITIAL_STATE',
      initialPosition: slidePositionsArray[projectSlideIndex] - carouselTopPadding * 2 + carouselSlides.current[0]?.offsetHeight / 2,
    });
  }, [slidePositionsArray.length, projectSlideIndex]);

  /** Sync global active project index tracker and useReducer state */
  useEffect(() => {
    if (projectSlideIndex !== state.activeSlideIndex) setProjectSlideIndex(state.activeSlideIndex);
  }, [state.activeSlideIndex]);

  /** JSX */
  return (
    <section className='projectDetails' ref={projectDetails}>
      <section className='projectDetails__general'>
        <div className='projectDetails__general__header'>
          <div>
            <span>{myProjects[projectSlideIndex].key}</span>
            <span>Insights</span>
          </div>
        </div>
        <div className='projectDetails__general__return'>
          <button aria-label='Return to project hub'>
            <svg xmlns='http://www.w3.org/2000/svg' width='3em' height='3em' viewBox='0 0 24 24'>
              <path
                fill='#ffffff'
                d='M9.42 7.41L4.83 12l4.59 4.59L8 18l-6-6l6-6zm6 0L10.83 12l4.59 4.59L14 18l-6-6l6-6zm6 0L16.83 12l4.59 4.59L20 18l-6-6l6-6z'></path>
            </svg>
          </button>
        </div>
        <div className='projectDetails__general__technology'>
          {Object.entries(myProjects[projectSlideIndex].technologies).map(([category, techArray]) => (
            <div className='projectDetails__general__technology__tech' key={category}>
              <div className='projectDetails__general__technology__tech--type'>{category.replace('_', ' ')}</div>
              {techArray.map((technology: string) => (
                <span className={`projectDetails__general__technology--tech projectDetails__general__technology--${technology}`} key={`${category}-${technology}`}>
                  {technology}{' '}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className='projectDetails__projects' ref={carousel}>
        <div className='projectDetails__projects__slider' ref={carouselSlider} style={state.style} data-status={!state.pointerDown ? 'smooth' : ''}>
          {myProjects.map((project, index) => (
            <figure ref={carouselSlide} key={project.key}>
              <picture data-status={index === state.activeSlideIndex ? 'active' : 'disabled'}>
                <img src={project.posterSrc} decoding='async' fetchpriority='high' tabIndex={0} alt={project.imgAlt} />
                <figcaption>{project.imgAlt}</figcaption>
              </picture>
            </figure>
          ))}
        </div>
      </section>

      <section className='projectDetails__insights' ref={insights}>
        <article className='projectDetails__insights__projectOverview'>{myProjects[projectSlideIndex].insights}</article>
      </section>
    </section>
  );
};

export default ProjectDetails;

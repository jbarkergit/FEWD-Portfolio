import { Dispatch, SetStateAction, useEffect, useReducer, useRef } from 'react';
import { myProjects } from '../../assets/projects-data/myProjects';

type ProjectDetailsType = { projectSlideIndex: number; setProjectSlideIndex: Dispatch<SetStateAction<number>> };

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
const ProjectDetails = ({ projectSlideIndex, setProjectSlideIndex }: ProjectDetailsType) => {
  /** References */
  const carousel = useRef<HTMLDivElement>(null);

  const carouselSlider = useRef<HTMLDivElement>(null);
  const carouselSliderHeight: number = carouselSlider.current?.scrollHeight as number;

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
          prevTrackPos: action.initialPosition,
          trackPos: action.initialPosition,
          style: { transform: `translateY(${action.initialPosition}px)` },
        };

      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageY: action.initPageY, pageY: action.pageY };

      case 'POINTER_MOVE':
        if (state.pointerDown) {
          const pointerTravelDistance: number = action.pageY - state.initPageY;
          const newTrackPosition: number = state.prevTrackPos + pointerTravelDistance;
          const travelDelta: number = carouselSliderHeight / 2 + carouselTopPadding * 2;
          const clampedTrackPosition: number = Math.max(Math.min(newTrackPosition, travelDelta), travelDelta * -1);

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

          const newSliderPosition = slidePositionsArray[state.activeSlideIndex] - carouselTopPadding * 2 + carouselSlides.current[0]?.offsetHeight / 2;

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

  /** Dispatch initial useReducer state action */
  const booleanFlag = useRef<boolean>(false);

  useEffect(() => {
    const carouselTopPadding: number = parseInt(window.getComputedStyle(carousel.current as HTMLElement).paddingTop);
    if (slidePositionsArray.length > 0 && !booleanFlag.current) {
      dispatch({
        type: 'SET_INITIAL_STATE',
        initialPosition: slidePositionsArray[projectSlideIndex] - carouselTopPadding * 2 + carouselSlides.current[0]?.offsetHeight / 2,
      });
      booleanFlag.current = true;
    }
  }, [slidePositionsArray.length]);

  /** Dispatch Actions */
  useEffect(() => {
    const userPointerDown = (e: PointerEvent) => dispatch({ type: 'POINTER_DOWN', pointerDown: true, initPageY: e.pageY, pageY: e.pageY });
    const userPointerMove = (e: PointerEvent) => dispatch({ type: 'POINTER_MOVE', pageY: e.pageY });
    const userPointerLeave = () => dispatch({ type: 'POINTER_LEAVE', pointerDown: false, previousTrackPos: state.trackPos });
    const userPointerUp = () => dispatch({ type: 'POINTER_UP', pointerDown: false, previousTrackPos: state.trackPos });
    const useInsightScroll = (event: WheelEvent) => insights.current?.scrollBy({ top: event.deltaY, behavior: 'smooth' });

    /** Event Listeners Mount */
    carousel.current?.addEventListener('pointerdown', userPointerDown);
    carousel.current?.addEventListener('pointermove', userPointerMove);
    carousel.current?.addEventListener('pointerleave', userPointerLeave);
    carousel.current?.addEventListener('pointerup', userPointerUp);
    projectDetails.current?.addEventListener('wheel', useInsightScroll);

    /** Event Listeners Unmount */
    return () => {
      carousel.current?.removeEventListener('pointerdown', userPointerDown);
      carousel.current?.removeEventListener('pointermove', userPointerMove);
      carousel.current?.removeEventListener('pointerleave', userPointerLeave);
      carousel.current?.removeEventListener('pointerup', userPointerUp);
      projectDetails.current?.removeEventListener('wheel', useInsightScroll);
    };
  }, []);

  /** Update global project index state */
  useEffect(() => setProjectSlideIndex(state.activeSlideIndex), [state.activeSlideIndex]);

  return (
    <section className='projectDetails' ref={projectDetails}>
      <section className='projectDetails__general'>
        <div className='projectDetails__general__header'>
          <button>
            <span>{myProjects[projectSlideIndex].key}</span>
            <span>Insights</span>
          </button>
        </div>

        <div className='projectDetails__general__technology'>
          {Object.entries(myProjects[projectSlideIndex].technologies).map(([category, techArray]) => (
            <div key={category}>
              <span>{category}</span>
              {techArray.map((technology: string) => (
                <span className={`projectDetails__general__technology--tech projectDetails__general__technology--${technology}`} key={`${category}-${technology}`}>
                  {technology}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className='projectDetails__projects' ref={carousel}>
        <div className='projectDetails__projects__slider' style={state.style} ref={carouselSlider}>
          {myProjects.map((project) => (
            <figure key={project.key} ref={carouselSlide}>
              <picture>
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

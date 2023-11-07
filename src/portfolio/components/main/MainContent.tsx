import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { initState } from './initial-state/initState';
import { actionType } from './types/actionType';
import { indexStateType } from './types/indexStateType';
import { initSliderStateType } from './types/initSliderStateType';
import { myProjects } from '../../assets/projects-data/myProjects';

const MainContent = ({ projectSlideIndex, setProjectSlideIndex }: indexStateType): JSX.Element => {
  //** Array of articles */
  const revealRefs = useRef<HTMLElement[]>([]);

  const addToRefs = useCallback((reference: HTMLElement) => {
    if (reference && !revealRefs.current.includes(reference)) revealRefs.current.push(reference);
  }, []);

  //** References */
  const targetElementRef = useRef<HTMLDivElement>(null);
  const targetElement: HTMLElement | null = targetElementRef.current as HTMLElement;

  //** Toggle Sliding Smooth Animation (Native behavior by-pass) */
  const [applySmoothenAnimation, setApplySmoothenAnimation] = useState<boolean>(false);

  const toggleSmoothenAnimation = () => {
    setApplySmoothenAnimation((prev) => !prev);
    setTimeout(() => setApplySmoothenAnimation(false), 250);
  };

  //** Reference information variables */
  // Slider track width
  const targetElementWidth: number = targetElement?.scrollWidth as number;
  // Array of articles
  const targetElementChildrenArray: HTMLElement[] = Array.from(targetElement?.children ?? []) as HTMLElement[];
  // PX Positions of all articles
  const targetElementChildrenPositionArray: number[] = targetElementChildrenArray.map((child) => child.offsetLeft * -1);

  //** Reducer: slider logic */
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
            targetElementLeftPadding: number = parseInt(window.getComputedStyle(targetElement).paddingLeft),
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
          const targetElementLeftPadding: number = parseInt(window.getComputedStyle(targetElement).paddingLeft);
          const closestChild: number = targetElementChildrenPositionArray[state.closestIndex] + targetElementLeftPadding;

          revealRefs.current.forEach((article, index) => {
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
        const targetElementLeftPadding: number = parseInt(window.getComputedStyle(targetElement).paddingLeft);
        let nextClosestIndex = state.closestIndex;

        scrollDirection === -1
          ? (nextClosestIndex = Math.min(nextClosestIndex + 1, targetElementChildrenPositionArray.length - 1))
          : (nextClosestIndex = Math.max(nextClosestIndex - 1, 0));

        const closestChild: number = targetElementChildrenPositionArray[nextClosestIndex] + targetElementLeftPadding;

        revealRefs.current.forEach((article, index) => {
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
        const targElementLeftPadding: number = parseInt(window.getComputedStyle(targetElement).paddingLeft);
        const setSliderPosition: number = targetElementChildrenPositionArray[projectSlideIndex] + targElementLeftPadding;

        revealRefs.current.forEach((article, index) => article.setAttribute('data-status', index === projectSlideIndex ? 'enabled' : 'disabled'));

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

    if (targetElementRef.current) {
      targetElementRef.current.addEventListener('pointerdown', userPointerDown);
      targetElementRef.current.addEventListener('pointermove', userPointerMove);
      targetElementRef.current.addEventListener('pointerleave', userPointerLeave);
      targetElementRef.current.addEventListener('pointerup', userPointerUp);
      targetElementRef.current.addEventListener('wheel', userWheelEvent);
    }

    return () => {
      if (targetElementRef.current) {
        targetElementRef.current.removeEventListener('pointerdown', userPointerDown);
        targetElementRef.current.removeEventListener('pointermove', userPointerMove);
        targetElementRef.current.removeEventListener('pointerleave', userPointerLeave);
        targetElementRef.current.removeEventListener('pointerup', userPointerUp);
        targetElementRef.current.removeEventListener('wheel', userWheelEvent);
      }
    };
  }, []);

  //** Index Tracker: current slide */
  useEffect(() => setProjectSlideIndex(state.closestIndex), [state.closestIndex]);

  //** Toggle data-status attribute (Resize of currently active element) */
  useEffect(() => dispatch({ type: 'BUTTON_NAVIGATION' }), [projectSlideIndex]);

  return (
    <main className={`mainContent ${applySmoothenAnimation ? 'smoothen' : ''}`} ref={targetElementRef} style={state.style} data-status='' data-layout='column'>
      {myProjects.map((project) => {
        return (
          <article className='mainContent__article' data-status={project.dataStatus} ref={addToRefs} key={project.key}>
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

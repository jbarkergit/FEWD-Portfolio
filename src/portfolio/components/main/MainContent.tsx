import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import ProjectNavProp from './ProjectNavProp';

type indexStateType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  projectInfoStyle: string;
  mainAnimator: boolean;
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

export const initState: initSliderStateType = {
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
  | { type: 'SCROLL'; deltaY: number; targetElementChildrenPositionArray: number[] }
  | { type: 'BUTTON_NAVIGATION' };

const MainContent = ({ projectSlideIndex, setProjectSlideIndex, projectInfoStyle, mainAnimator }: indexStateType): JSX.Element => {
  const targetElementRef = useRef<HTMLDivElement>(null),
    targetElement: HTMLElement | null = targetElementRef.current as HTMLElement,
    targetElementWidth: number = targetElement?.scrollWidth as number,
    targetElementChildrenArray: HTMLElement[] = Array.from(targetElement?.children ?? []) as HTMLElement[],
    targetElementChildrenPositionArray: number[] = targetElementChildrenArray.map((child) => child.offsetLeft * -1);
  const [applySmoothenAnimation, setApplySmoothenAnimation] = useState<boolean>(false);

  const toggleSmoothenAnimation = () => {
    setApplySmoothenAnimation((prev) => !prev);
    setTimeout(() => {
      setApplySmoothenAnimation(false);
    }, 250);
  };

  const revealRefs = useRef<HTMLElement[]>([]);

  const addToRefs = useCallback((reference: HTMLElement) => {
    if (reference && !revealRefs.current.includes(reference)) revealRefs.current.push(reference);
  }, []);

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
    const targetElement = targetElementRef?.current!;

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

    targetElement?.addEventListener('pointerdown', userPointerDown);
    targetElement?.addEventListener('pointermove', userPointerMove);
    targetElement?.addEventListener('pointerleave', userPointerLeave);
    targetElement?.addEventListener('pointerup', userPointerUp);
    targetElement?.addEventListener('wheel', userWheelEvent);

    return () => {
      targetElement?.removeEventListener('pointerdown', userPointerDown);
      targetElement?.removeEventListener('pointermove', userPointerMove);
      targetElement?.removeEventListener('pointerleave', userPointerLeave);
      targetElement?.removeEventListener('pointerup', userPointerUp);
      targetElement?.removeEventListener('wheel', userWheelEvent);
    };
  }, []);

  useEffect(() => setProjectSlideIndex(state.closestIndex), [state.closestIndex]); // Keep track of slide index globally
  useEffect(() => toggleSmoothenAnimation(), [projectSlideIndex]); // Toggle data-attr anim
  useEffect(() => dispatch({ type: 'BUTTON_NAVIGATION' }), [projectSlideIndex]);

  // Adjust "main" (slider) height based on projectDetail state
  useEffect(() => {
    if (projectInfoStyle !== '' && targetElementRef.current) targetElementRef.current.style.width = 'auto';
    else {
      if (targetElementRef.current) targetElementRef.current.style.width = 'max-content';
    }
  }, [projectInfoStyle]);

  // Main slider transitional animation
  useEffect(() => {
    if (mainAnimator) {
      if (targetElementRef.current) {
        targetElementRef.current.style.scale = '90%'; // css-only anim overrides smoothen anim due to shared props
      }
      setTimeout(() => {
        // Additional 250px to accommodate scale
        if (targetElementRef.current) targetElementRef.current.style.transform = `translateX(-${targetElementWidth + 250}px)`;
      }, 250);
    }
  }, [mainAnimator]);

  return (
    <main
      className={`mainContent ${applySmoothenAnimation ? 'smoothen' : ''} ${mainAnimator ? 'mainAnimatorOn' : ''}`}
      ref={targetElementRef}
      style={state.style}
      data-status={mainAnimator ? 'active' : 'false'}>
      <ProjectNavProp imgSrc='src/portfolio/assets/compressed-project-images/ecommerce-preview.png' dataStatus='active' addToRefs={addToRefs} />
      <ProjectNavProp imgSrc='src/portfolio/assets/compressed-project-images/hyundai-preview.jpg' dataStatus='disabled' addToRefs={addToRefs} />
    </main>
  );
};

export default MainContent;

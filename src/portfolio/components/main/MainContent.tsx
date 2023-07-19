import { RefObject, useEffect, useReducer, useRef } from 'react';
import ProjectNavProp from './ProjectNavProp';

type initStateType = {
  pointerDown: boolean;
  initPageX: number;
  pageX: number;
  trackPos: number;
  previousTrackPos: number;
  closestIndex: number;
  style: React.CSSProperties;
};

const initState: initStateType = {
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
  | { type: 'POINTER_UP'; pointerDown: boolean };

const MainContent = (): JSX.Element => {
  const targetElementRef: RefObject<HTMLElement> = useRef<HTMLElement>(null),
    targetElement: HTMLElement | null = targetElementRef.current as HTMLElement,
    targetElementWidth: number = targetElement?.scrollWidth as number,
    targetElementChildrenArray: HTMLElement[] = Array.from(targetElement?.children ?? []).map((child) => child as HTMLElement),
    targetElementChildrenPositionArray: number[] = targetElementChildrenArray.map((child) => child.offsetLeft * -1);

  const reducer = (state: initStateType, action: actionType): initStateType => {
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
          let closestIndex = state.closestIndex;
          for (let i = 0; i < targetElementChildrenPositionArray.length; i++) {
            const distanceFromTrackPos = Math.abs(targetElementChildrenPositionArray[i] - state.trackPos);
            const previousIndex = Math.abs(targetElementChildrenPositionArray[closestIndex] - state.trackPos);
            if (distanceFromTrackPos < previousIndex) {
              closestIndex = i;
            }
          }
          const targetElementLeftPadding: number = parseInt(window.getComputedStyle(targetElement).paddingLeft);
          const closestChild: number = targetElementChildrenPositionArray[closestIndex] + targetElementLeftPadding;

          return {
            ...state,
            pointerDown: false,
            trackPos: closestChild,
            previousTrackPos: closestChild,
            closestIndex: closestIndex,
            style: {
              transform: `translateX(${closestChild}px)`,
              transitionDuration: '600ms',
            },
          };
        }
      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const targetElement = targetElementRef?.current;

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
    const userPointerUp = () => dispatch({ type: 'POINTER_UP', pointerDown: false });

    targetElement?.addEventListener('pointerdown', userPointerDown);
    targetElement?.addEventListener('pointermove', userPointerMove);
    targetElement?.addEventListener('pointerleave', userPointerLeave);
    targetElement?.addEventListener('pointerup', userPointerUp);

    return () => {
      targetElement?.removeEventListener('pointerdown', userPointerDown);
      targetElement?.removeEventListener('pointermove', userPointerMove);
      targetElement?.removeEventListener('pointerleave', userPointerLeave);
      targetElement?.removeEventListener('pointerup', userPointerUp);
    };
  }, [state.pointerDown]);

  return (
    <main className="mainContent">
      <nav className="mainContent__nav" ref={targetElementRef} style={state.style}>
        <ProjectNavProp
          slide="01"
          imgSrc="src\ecommerce\assets\production-images\compressed-home-page\infographic\img-by-ilias-chebbi-on-unsplash.jpg"
          projectName="Dynamic Audio"
          projectType="Ecommerce"
          demoLink="/ecommerce"
          dataStatus="active"
          dataActivity="active"
        />
        <ProjectNavProp
          slide="02"
          imgSrc="src\portfolio\assets\production-images\possessed-photography-JjGXjESMxOY-unsplash.jpg"
          projectName="FE Assistant"
          projectType="Work in Progress"
          imgStyle={{ objectPosition: 'top center' }}
          dataStatus="disabled"
          dataActivity="disabled"
        />
        <ProjectNavProp
          slide="03"
          imgSrc="src\portfolio\assets\production-images\alexander-shatov-sIFCJHrUWPM-unsplash.jpg"
          projectName="Freemium Discord"
          projectType="Pre-development"
          dataStatus="disabled"
          dataActivity="disabled"
        />
        <ProjectNavProp slide="04" imgSrc="" projectName="Unknown" projectType="To be determined" dataStatus="disabled" dataActivity="disabled" />
        <ProjectNavProp slide="05" imgSrc="" projectName="Unknown" projectType="To be determined" dataStatus="disabled" dataActivity="disabled" />
      </nav>
    </main>
  );
};

export default MainContent;

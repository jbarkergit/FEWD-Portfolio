import { useEffect, useReducer, useRef } from 'react';
import ProjectNavProp from './ProjectNavProp';

type initStateType = {
  mouseDown: boolean;
  initX: number;
  clientX: number;
  trackPos: number;
  prevTrackPos: number;
  style: React.CSSProperties;
};

const initState: initStateType = {
  mouseDown: false,
  initX: 0,
  clientX: 0,
  trackPos: 0,
  prevTrackPos: 0,
  style: { transform: `translateX(0px)` },
};

type actionType =
  | { type: 'MOUSE_DOWN'; mouseDown: boolean; initX: number; clientX: number }
  | { type: 'MOUSE_MOVE'; mouseDown: boolean; initX: number; clientX: number }
  | { type: 'MOUSE_LEAVE'; mouseDown: boolean }
  | { type: 'MOUSE_UP'; mouseDown: boolean };

const PortFooter = (): JSX.Element => {
  const targetElementRef = useRef<HTMLElement>(null),
    targetElement = targetElementRef?.current;

  const reducer = (state: initStateType, action: actionType): initStateType => {
    switch (action.type) {
      case 'MOUSE_DOWN':
        return { ...state, mouseDown: true, initX: action.initX, clientX: action.clientX };

      case 'MOUSE_MOVE':
        if (state.mouseDown === false) {
          return state;
        } else {
          const targetElementWidth: number = targetElement?.offsetWidth as number;
          const targetElementChildrenWidthArray: number[] = Array.from(targetElement?.children!).map((child) => (child as HTMLElement).offsetWidth),
            targetElementChildrenMedianWidth: number = targetElementChildrenWidthArray.sort((a, b) => a - b)[Math.floor(targetElementChildrenWidthArray.length / 2)];
          const targetElementChildrenComputedStyleGap: number = parseInt(window.getComputedStyle(targetElement!).gap) as number,
            targetElementChildrenComputedStyleGapSum: number = targetElementChildrenComputedStyleGap * targetElementChildrenWidthArray.length;
          const maximumDelta: number = (targetElementWidth - targetElementChildrenMedianWidth - targetElementChildrenComputedStyleGapSum) * -1;

          const { initX, clientX } = action,
            targetElementTravelDistance: number = clientX - initX,
            latestTrackPosition: number = state.prevTrackPos + targetElementTravelDistance,
            clampedTrackPosition: number = Math.max(Math.min(latestTrackPosition, 0), maximumDelta);

          const lerp = (a: number, b: number, t: number): number => a + (b - a) * t; //Lenis Package Lerp Instance
          const interpolatedTrackPosition = lerp(state.trackPos, clampedTrackPosition, 0.1);

          return { ...state, trackPos: interpolatedTrackPosition, style: { transform: `translateX(${interpolatedTrackPosition}px)` } };
        }

      case 'MOUSE_LEAVE':
        return {
          ...state,
          mouseDown: false,
          prevTrackPos: state.trackPos,
        };
      case 'MOUSE_UP':
        const targetElementChildrenArray: HTMLElement[] = Array.from(targetElement!.children).map((child) => child as HTMLElement);
        const targetElementChildrenPositionArray: number[] = targetElementChildrenArray.map((child, i, arr) =>
          arr.slice(0, i + 1).reduce((sum, child) => sum + child.offsetWidth, 0)
        );

        let closestIndex = 0;

        for (let i = 0; i < targetElementChildrenPositionArray.length; i++) {
          const difference = Math.abs(targetElementChildrenPositionArray[i] * -1 - state.trackPos);
          if (difference < Math.abs(targetElementChildrenPositionArray[closestIndex] * -1 - state.trackPos)) {
            closestIndex = i;
          }
        }

        const closestChild: number = targetElementChildrenPositionArray[closestIndex] * -1;

        return {
          ...state,
          mouseDown: false,
          trackPos: closestChild,
          prevTrackPos: state.trackPos,
          style: {
            ...state.style,
            transform: `translateX(${closestChild}px)`,
            transitionDuration: '1200ms',
          },
        };

      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const targetElement = targetElementRef?.current;

    const userMouseDown = (e: MouseEvent) => {
      const clientX = e.clientX as number;
      dispatch({ type: 'MOUSE_DOWN', mouseDown: true, initX: clientX, clientX: clientX });
    };
    const userMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX as number;
      dispatch({
        type: 'MOUSE_MOVE',
        initX: state.initX,
        clientX: clientX,
        mouseDown: state.mouseDown,
      });
    };
    const userMouseLeave = () => dispatch({ type: 'MOUSE_LEAVE', mouseDown: false });
    const userMouseUp = () => dispatch({ type: 'MOUSE_UP', mouseDown: false });

    targetElement?.addEventListener('mousedown', userMouseDown);
    targetElement?.addEventListener('mousemove', userMouseMove);
    targetElement?.addEventListener('mouseleave', userMouseLeave);
    targetElement?.addEventListener('mouseup', userMouseUp);

    return () => {
      targetElement?.removeEventListener('mousedown', userMouseDown);
      targetElement?.removeEventListener('mousemove', userMouseMove);
      targetElement?.removeEventListener('mouseleave', userMouseLeave);
      targetElement?.removeEventListener('mouseup', userMouseUp);
    };
  }, [state.mouseDown]);

  return (
    <footer className="portFooter">
      <nav className="portFooter__nav" ref={targetElementRef} style={state.style}>
        <ProjectNavProp
          linkTo="/ecommerce"
          imgSrc="src\ecommerce\assets\production-images\compressed-home-page\infographic\img-by-ilias-chebbi-on-unsplash.jpg"
          projectName="Dynamic Audio"
          projectType="Ecommerce"
        />
        <ProjectNavProp
          linkTo="/disclosure"
          imgSrc="https://images.unsplash.com/photo-1613035617861-c7b29e5cf65c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          projectName="Disclosure (TBD)"
          projectType="Communication"
        />
        <ProjectNavProp
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
        <ProjectNavProp
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
        <ProjectNavProp
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
        <ProjectNavProp
          linkTo=""
          imgSrc="https://images.unsplash.com/photo-1683752495866-6bd49d91699f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          projectName="Unknown"
          projectType="TBD"
        />
      </nav>
    </footer>
  );
};

export default PortFooter;

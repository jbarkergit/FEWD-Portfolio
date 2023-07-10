import { useEffect, useReducer, useRef } from 'react';
import ProjectNavProp from './ProjectNavProp';

type initStateType = {
  mouseDown: boolean;
  initX: number;
  clientX: number;
  trackPos: number;
  style: React.CSSProperties;
};

const initState: initStateType = {
  mouseDown: false,
  initX: 0,
  clientX: 0,
  trackPos: 0,
  style: { transform: `translateX(0px)` },
};

type actionType =
  | { type: 'MOUSE_DOWN'; mouseDown: boolean; initX: number; clientX: number }
  | { type: 'MOUSE_MOVE'; mouseDown: boolean; initX: number; clientX: number }
  | { type: 'MOUSE_LEAVE'; mouseDown: boolean }
  | { type: 'MOUSE_UP'; mouseDown: boolean };

const PortFooter = (): JSX.Element => {
  const targetElementRef = useRef<HTMLElement>(null);

  const reducer = (state: initStateType, action: actionType): initStateType => {
    const getTargetElement = () => targetElementRef.current,
      targetElement = getTargetElement();

    switch (action.type) {
      case 'MOUSE_DOWN':
        return { ...state, mouseDown: true, initX: action.initX, clientX: action.clientX };
      case 'MOUSE_MOVE':
        if (state.mouseDown === false) {
          return state;
        } else {
          const { initX, clientX } = action,
            travelDistance: number = Math.floor((clientX - initX) / 40),
            latestTrackPosition: number = Math.floor(state.trackPos + travelDistance);
          const targetElementWidth: number = targetElement?.offsetWidth as number;
          const targetElementChildrenArray: number[] = Array.from(targetElement?.children!).map((child) => (child as HTMLElement).offsetWidth),
            targetElementChildrenMedianWidth: number = targetElementChildrenArray.sort((a, b) => a - b)[Math.floor(targetElementChildrenArray.length / 2)];
          const targetElementChildrenComputedStyle: CSSStyleDeclaration = window.getComputedStyle(targetElement!),
            targetElementChildrenComputedStyleGap: number = parseInt(targetElementChildrenComputedStyle.gap) as number,
            targetElementChildrenComputedStyleGapSum: number = targetElementChildrenComputedStyleGap * targetElementChildrenArray.length;
          const maximumDelta: number = targetElementChildrenMedianWidth - targetElementWidth + targetElementChildrenComputedStyleGapSum;
          const clampedTrackPosition: number = Math.max(Math.min(latestTrackPosition, 0), maximumDelta),
            newTrackPosition: number = Math.floor(state.trackPos + (clampedTrackPosition - state.trackPos) * 0.8);

          return { ...state, trackPos: newTrackPosition, style: { transform: `translateX(${newTrackPosition}px)` } };
        }
      case 'MOUSE_LEAVE':
      case 'MOUSE_UP':
        return { ...state, mouseDown: false };
      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const targetElement = targetElementRef.current;

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
  }, [state.initX]);

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

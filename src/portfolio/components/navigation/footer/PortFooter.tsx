import { RefObject, useEffect, useReducer, useRef } from 'react';

type ProjectNavPropType = {
  imgSrc: string;
  projectName: string;
  projectType: string;
  dataStatus: string;
};

const ProjectNavProp = ({ imgSrc, projectName, projectType, dataStatus }: ProjectNavPropType): JSX.Element => {
  return (
    <article data-status={dataStatus}>
      <picture>{imgSrc ? <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" /> : null}</picture>
      <hgroup data-status={dataStatus}>
        <h2>{projectName}</h2>
        <h3>{projectType}</h3>
      </hgroup>
    </article>
  );
};

type initStateType = {
  mouseDown: boolean;
  initX: number;
  pageX: number;
  trackPos: number;
  closestIndex: number;
  style: React.CSSProperties;
};

const initState: initStateType = {
  mouseDown: false,
  initX: 0,
  pageX: 0,
  trackPos: 0,
  closestIndex: 0,
  style: { transform: `translateX(0px)` },
};

type actionType =
  | { type: 'MOUSE_DOWN'; mouseDown: boolean; initX: number; pageX: number }
  | { type: 'MOUSE_MOVE'; mouseDown: boolean; initX: number; pageX: number }
  | { type: 'MOUSE_LEAVE'; mouseDown: boolean }
  | { type: 'MOUSE_UP'; mouseDown: boolean };

const PortFooter = (): JSX.Element => {
  const targetElementRef = useRef<HTMLElement>(null),
    targetElement = targetElementRef?.current;

  const reducer = (state: initStateType, action: actionType): initStateType => {
    switch (action.type) {
      case 'MOUSE_DOWN':
        return { ...state, mouseDown: true, initX: action.initX, pageX: action.pageX };

      case 'MOUSE_MOVE':
        if (state.mouseDown === false) {
          return state;
        } else {
          const targetElementWidth: number = targetElement?.offsetWidth as number;
          // const targetElementChildrenWidthArray: number[] = Array.from(targetElement?.children!).map((child) => (child as HTMLElement).offsetWidth),
          //   targetElementChildrenMedianWidth: number = targetElementChildrenWidthArray.sort((a, b) => a - b)[Math.floor(targetElementChildrenWidthArray.length / 2)];
          // const targetElementChildrenComputedStyleGap: number = parseInt(window.getComputedStyle(targetElement!).gap) as number,
          //   targetElementChildrenComputedStyleGapSum: number = targetElementChildrenComputedStyleGap * targetElementChildrenWidthArray.length;
          // const maximumDelta: number = (targetElementWidth - targetElementChildrenMedianWidth - targetElementChildrenComputedStyleGapSum) * -1;
          const maximumDelta: number = targetElementWidth * -1;

          const { initX, pageX } = action,
            targetElementTravelDistance: number = pageX - initX,
            latestTrackPosition: number = state.trackPos + targetElementTravelDistance,
            clampedTrackPosition: number = Math.max(Math.min(latestTrackPosition, 0), maximumDelta);

          const lerp = (a: number, b: number, t: number): number => a + (b - a) * t; //Lenis Package Lerp Instance
          const interpolatedTrackPosition = lerp(state.trackPos, clampedTrackPosition, 0.05);

          return { ...state, trackPos: interpolatedTrackPosition, style: { transform: `translateX(${interpolatedTrackPosition}px)` } };
        }

      case 'MOUSE_LEAVE':
      case 'MOUSE_UP':
        const targetElementChildrenArray: HTMLElement[] = Array.from(targetElement!.children).map((child) => child as HTMLElement);
        const targetElementChildrenPositionArray: number[] = targetElementChildrenArray.map((child) => child.offsetLeft * -1);

        let closestIndex = 0;

        for (let i = 0; i < targetElementChildrenPositionArray.length; i++) {
          const difference = Math.abs(targetElementChildrenPositionArray[i] - state.trackPos);
          const previousIndex = Math.abs(targetElementChildrenPositionArray[closestIndex] - state.trackPos);
          if (difference < previousIndex) {
            closestIndex = i;
          }
        }

        const targetElementLeftPadding = parseInt(window.getComputedStyle(targetElement!).paddingLeft);
        const closestChild: number = targetElementChildrenPositionArray[closestIndex] + targetElementLeftPadding;

        targetElementChildrenArray.forEach((childElement, index) => {
          const isClosest = index === closestIndex;
          const dataStatus = isClosest ? 'active' : 'disabled';
          childElement.children[1].setAttribute('data-status', dataStatus);
        });

        return {
          ...state,
          mouseDown: false,
          trackPos: closestChild,
          closestIndex: closestIndex,
          style: {
            transform: `translateX(${closestChild}px)`,
            transitionDuration: '600ms',
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
      const pageX = e.pageX as number;
      dispatch({ type: 'MOUSE_DOWN', mouseDown: true, initX: pageX, pageX: pageX });
    };
    const userMouseMove = (e: MouseEvent) => {
      const pageX = e.pageX as number;
      dispatch({
        type: 'MOUSE_MOVE',
        initX: state.initX,
        pageX: pageX,
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
      <div className="portNavigation">
        <nav className="portNavigation__nav" ref={targetElementRef} style={state.style}>
          <ProjectNavProp
            imgSrc="src\ecommerce\assets\production-images\compressed-home-page\infographic\img-by-ilias-chebbi-on-unsplash.jpg"
            projectName="Dynamic Audio"
            projectType="Ecommerce"
            dataStatus="active"
          />
          <ProjectNavProp imgSrc="" projectName="FE Assistant" projectType="Work in Progress" dataStatus="disabled" />
          <ProjectNavProp imgSrc="" projectName="Slack Clone" projectType="Pre-development" dataStatus="disabled" />
          <ProjectNavProp imgSrc="" projectName="TBD" projectType="" dataStatus="disabled" />
          <ProjectNavProp imgSrc="" projectName="TBD" projectType="" dataStatus="disabled" />
        </nav>
      </div>
      <div className="portFooter__navInfo">{`${state.closestIndex + 1} / 5`}</div>
    </footer>
  );
};

export default PortFooter;

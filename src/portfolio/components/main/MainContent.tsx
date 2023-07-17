import { RefObject, useEffect, useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';

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

type ProjectNavPropType = {
  slide: string;
  imgSrc: string;
  projectName: string;
  projectType: string;
  imgStyle?: React.CSSProperties;
  dataStatus: string;
  demoLink?: string;
  dataActivity: string;
};

const PortFooter = (): JSX.Element => {
  const targetElementRef: RefObject<HTMLElement> = useRef<HTMLElement>(null),
    targetElement: HTMLElement | null = targetElementRef.current as HTMLElement,
    targetElementWidth: number = targetElement?.scrollWidth as number,
    targetElementChildrenArray: HTMLElement[] = Array.from(targetElement?.children ?? []).map((child) => child as HTMLElement),
    targetElementChildrenPositionArray: number[] = targetElementChildrenArray.map((child) => child.offsetLeft * -1);

  const ProjectNavProp = ({ slide, imgSrc, projectName, projectType, imgStyle, dataStatus, demoLink, dataActivity }: ProjectNavPropType): JSX.Element => {
    return (
      <article className="sliderArticle" data-status={dataStatus}>
        <div className="sliderArticle__data">
          <div className="sliderArticle__data__left">
            <span className="sliderArticle__data__left__slideNum">{slide}.</span>
            <hgroup>
              <span>
                <h3>{projectType}</h3>
                <h2>{projectName}</h2>
              </span>
            </hgroup>
          </div>
          <div className="sliderArticle__data__liveDemo">
            {demoLink ? (
              <Link to={demoLink} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M1.25 9A6.75 6.75 0 0 1 8 2.25h4a6.75 6.75 0 0 1 0 13.5h-2a.75.75 0 0 1 0-1.5h2a5.25 5.25 0 1 0 0-10.5H8a5.25 5.25 0 0 0-3.913 8.75a.75.75 0 0 1-1.118 1A6.728 6.728 0 0 1 1.25 9ZM12 9.75a5.25 5.25 0 1 0 0 10.5h4a5.25 5.25 0 0 0 3.913-8.75a.75.75 0 1 1 1.118-1A6.75 6.75 0 0 1 16 21.75h-4a6.75 6.75 0 0 1 0-13.5h2a.75.75 0 0 1 0 1.5h-2Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {'Open Demo'}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="sliderArticle__pictureWrapper">
          <picture data-activity={dataActivity}>
            {imgSrc ? <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" style={imgStyle} /> : null}
          </picture>
        </div>
      </article>
    );
  };

  const reducer = (state: initStateType, action: actionType): initStateType => {
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...state, pointerDown: true, initPageX: action.initPageX, pageX: action.pageX };

      case 'POINTER_MOVE':
        if (state.pointerDown === false) {
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
        if (state.pointerDown === false) {
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

          const targetElements = document.querySelectorAll('[data-status]');
          targetElements.forEach((element) => {
            const isClosestChild = element.getAttribute('data-closestChild') === closestChild.toString();
            element.setAttribute('data-status', isClosestChild ? 'enabled' : 'disabled');
          });

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

export default PortFooter;

import { useEffect, useRef, useState } from 'react';
import ProjectHub from './project-hub/ProjectHub';
import ProjectDetails from './project-details/ProjectDetails';
import ContactForm from './contact-form/ContactForm';

/** Component */
const Portfolio = (): JSX.Element => {
  const portfolioRef = useRef<HTMLDivElement>(null);

  /** Active Project Slide Index Tracker */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  /** Active grid position trackers */
  const [activeGridFeature, setActiveGridFeature] = useState<number>(0);

  const [featureState, setFeatureState] = useState<Record<string, boolean>>({
    projectDetailsActive: false,
    contactFormActive: false,
  });

  /** Grid position transitions && animators */
  const useFeatureScroll = (index: number, scrollBehavior: ScrollBehavior) => {
    setTimeout(() => {
      if (portfolioRef.current) {
        const project = portfolioRef.current?.children[index] as HTMLElement;
        portfolioRef.current.scrollTo({ left: project.offsetLeft, top: project.offsetTop, behavior: scrollBehavior });
      }
    }, 500);
  };

  // useFeatureScroll invoker - handles all cases based on featureState
  const featureScrollHandler = (scrollBehavior: ScrollBehavior, index?: number) => {
    switch (true) {
      case featureState.projectDetailsActive:
        useFeatureScroll(1, scrollBehavior);
        break;

      case featureState.contactFormActive:
        useFeatureScroll(2, scrollBehavior);
        break;

      default:
        if (index) useFeatureScroll(index, scrollBehavior);
        else useFeatureScroll(0, scrollBehavior);
        break;
    }
  };

  // Reset grid position on mount
  useEffect(() => useFeatureScroll(0, 'instant'), []);

  // Maintain current grid position on window resize
  useEffect(() => {
    const invokeFeatureScroll = () => featureScrollHandler('instant', activeGridFeature);
    window.addEventListener('resize', invokeFeatureScroll);
    return () => window.removeEventListener('resize', invokeFeatureScroll);
  }, [activeGridFeature]);

  /** */
  const portfolioCursorTrail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // featureScrollHandler (utilizes featureState)
    featureScrollHandler('smooth');

    // Cursor trail
    const useCursorTrail = (e: PointerEvent) => {
      if (portfolioCursorTrail.current) {
        const defaultAnimatePositions = { top: e.clientY, left: e.clientX };
        let animatePositions = defaultAnimatePositions;

        if (Object.keys(featureState).some((value) => featureState[value] === true)) {
          switch (true) {
            case featureState.projectDetailsActive:
              animatePositions = { top: e.clientY + window.innerHeight, left: e.clientX };
              setActiveGridFeature(1);
              break;
            case featureState.contactFormActive:
              animatePositions = { top: e.clientY, left: e.clientX + window.innerWidth };
              setActiveGridFeature(2);
              break;
            default:
              animatePositions = defaultAnimatePositions;
              setActiveGridFeature(0);
              break;
          }
        } else {
          animatePositions = defaultAnimatePositions;
          setActiveGridFeature(0);
        }

        portfolioCursorTrail.current.animate({ top: `${animatePositions.top}px`, left: `${animatePositions.left}px` }, { duration: 15, fill: 'forwards' });

        // Cursor trail type interactions
        const target = e.target;
        portfolioCursorTrail.current.removeAttribute('data-status');

        switch (true) {
          case target instanceof HTMLButtonElement:
            portfolioCursorTrail.current.setAttribute('data-status', 'button');
            break;

          case target instanceof HTMLAnchorElement:
            portfolioCursorTrail.current.setAttribute('data-status', 'anchor');
            break;

          default:
            portfolioCursorTrail.current.removeAttribute('data-status');
            break;
        }
      }
    };

    portfolioRef.current?.addEventListener('pointermove', useCursorTrail);
    return () => portfolioRef.current?.removeEventListener('pointermove', useCursorTrail);
  }, [featureState]);

  /** Portfolio */
  return (
    <div className='portfolio' ref={portfolioRef}>
      <ProjectHub projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      <ProjectDetails projectSlideIndex={projectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      <ContactForm featureState={featureState} setFeatureState={setFeatureState} />
      <div className='portfolio__cursorTrail' ref={portfolioCursorTrail} />
    </div>
  );
};

export default Portfolio;

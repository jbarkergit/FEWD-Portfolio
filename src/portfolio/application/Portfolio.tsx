import { useEffect, useRef, useState } from 'react';
import ProjectHub from './project-hub/ProjectHub';
import ProjectDetails from './project-details/ProjectDetails';
import ContactForm from './contact-form/ContactForm';

const Portfolio = (): JSX.Element => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const portfolioCursorTrail = useRef<HTMLDivElement>(null);

  /** Active Project Slide Index Tracker */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  /** Application Mount Animation */
  const [mountAnimation, setMountAnimation] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setMountAnimation(false), 360);
  }, [portfolioRef.current]);

  /** Component transition state */
  const [featureState, setFeatureState] = useState<Record<string, boolean>>({
    projectDetailsActive: false,
    contactFormActive: false,
  });

  /** Component transition animation */
  const useFeatureScroll = (index: number, scrollBehavior: ScrollBehavior) => {
    if (portfolioRef.current) {
      const project = portfolioRef.current.children[index] as HTMLElement;
      portfolioRef.current.scrollTo({ left: project.offsetLeft, top: project.offsetTop, behavior: scrollBehavior });
    }
  };

  // Track active grid feature position
  const [activeGridFeature, setActiveGridFeature] = useState<number>(0);

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

  /** Transitional animations */
  // Reset grid position on mount
  useEffect(() => {
    useFeatureScroll(0, 'instant');
  }, []);

  // Maintain current grid position on window resize
  useEffect(() => {
    const invokeFeatureScroll = () => featureScrollHandler('smooth', activeGridFeature);
    window.addEventListener('resize', invokeFeatureScroll);
    return () => window.removeEventListener('resize', invokeFeatureScroll);
  }, [activeGridFeature]);

  /** */
  useEffect(() => {
    // featureScrollHandler (utilizes featureState)
    featureScrollHandler('smooth');

    // Cursor trail
    const useCursorTrail = (e: PointerEvent) => {
      if (portfolioCursorTrail.current && window.location.pathname === '/') {
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

        portfolioCursorTrail.current.animate({ top: `${animatePositions.top}px`, left: `${animatePositions.left}px` }, { delay: 15, fill: 'both' });
      }
    };

    window.addEventListener('pointermove', useCursorTrail);
    return () => window.removeEventListener('pointermove', useCursorTrail);
  }, [featureState]);

  /** Portfolio */
  return (
    <div className={`portfolio ${mountAnimation ? 'data-mount-animation-fade-in' : ''}`} ref={portfolioRef}>
      <ProjectHub projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      <ProjectDetails projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} />
      <ContactForm />
      <div className='portfolio__cursorTrail' ref={portfolioCursorTrail} />
    </div>
  );
};

export default Portfolio;

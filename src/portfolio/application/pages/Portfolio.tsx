import { useEffect, useRef, useState } from 'react';
import ProjectHub from '../project-hub/ProjectHub';
import ProjectDetails from '../project-details/ProjectDetails';
import ContactForm from '../contact-form/ContactForm';

/** Component */
const Portfolio = (): JSX.Element => {
  const portfolioRef = useRef<HTMLDivElement>(null);

  /** Active Project Slide Index Tracker */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  /** Active grid position tracker */
  const [featureState, setFeatureState] = useState<Record<string, boolean>>({
    projectDetailsActive: false,
    contactFormActive: false,
  });

  /** Grid position transitions && animators */
  const useFeatureScroll = (index: number, scrollBehavior: ScrollBehavior) => {
    setTimeout(
      () => {
        if (portfolioRef.current) {
          const project = portfolioRef.current?.children[index] as HTMLElement;
          portfolioRef.current.scrollTo({ left: project.offsetLeft, top: project.offsetTop, behavior: scrollBehavior });
        }
      },
      Object.values(featureState).some((value) => value === true) ? 1000 : 0
    );
  };

  // useFeatureScroll invoker - handles all cases based on featureState
  const useFeatureScrollHandler = (scrollBehavior: ScrollBehavior, index?: number) => {
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

  useEffect(() => {
    // Invoke animator
    useFeatureScrollHandler('smooth');

    // Maintain current grid position on window resize
    let activeGridPosition: number = 0;

    if (Object.keys(featureState).some((value: string) => featureState[value] === true)) {
      switch (true) {
        case featureState.projectDetailsActive:
          activeGridPosition = 1;
          break;
        case featureState.contactFormActive:
          activeGridPosition = 2;
          break;
        default:
          activeGridPosition = 0;
          break;
      }
    }

    const invokeFeatureScroll = () => useFeatureScrollHandler('instant', activeGridPosition);
    window.addEventListener('resize', invokeFeatureScroll);
    return () => window.removeEventListener('resize', invokeFeatureScroll);
  }, [featureState]);

  /** Portfolio */
  return (
    <div className='portfolio' ref={portfolioRef}>
      <ProjectHub projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      <ProjectDetails
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        featureState={featureState}
        setFeatureState={setFeatureState}
      />
      <ContactForm featureState={featureState} setFeatureState={setFeatureState} />
    </div>
  );
};

export default Portfolio;

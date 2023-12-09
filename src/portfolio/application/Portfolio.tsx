import { useEffect, useRef, useState } from 'react';
import ProjectHub from './project-hub/ProjectHub';
import ProjectDetails from './project-details/ProjectDetails';
import ContactForm from './contact-form/ContactForm';

const Portfolio = (): JSX.Element => {
  const portfolioRef = useRef<HTMLDivElement>(null);

  /** Active project slide index tracker */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  /** Mount Animation */
  const [mountAnimation, setMountAnimation] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setMountAnimation(false), 350);
  }, [portfolioRef.current]);

  /** Component transitions */
  const [featureScrollIndex, setFeatureScrollIndex] = useState<number>(0);

  const [featureState, setFeatureState] = useState({
    projectDetailsActive: false,
    contactFormActive: false,
  });

  const useFeatureScroll = (index: number, scrollBehavior: ScrollBehavior) => {
    if (portfolioRef.current) {
      const project = portfolioRef.current.children[index] as HTMLElement;
      portfolioRef.current.scrollTo({ left: project.offsetLeft, top: project.offsetTop, behavior: scrollBehavior });
    }
  };

  const featureScrollHandler = (scrollBehavior: ScrollBehavior, index?: number) => {
    switch (true) {
      case featureState.projectDetailsActive:
        useFeatureScroll(1, scrollBehavior);
        setFeatureScrollIndex(1);
        break;
      case featureState.contactFormActive:
        useFeatureScroll(2, scrollBehavior);
        setFeatureScrollIndex(2);
        break;
      default:
        if (index) {
          useFeatureScroll(index, scrollBehavior);
          setFeatureScrollIndex(index);
        } else {
          useFeatureScroll(0, scrollBehavior);
          setFeatureScrollIndex(0);
        }
        break;
    }
  };

  useEffect(() => featureScrollHandler('smooth'), [featureState]);

  useEffect(() => {
    useFeatureScroll(0, 'instant');
    const invokeFeatureScroll = () => featureScrollHandler('instant', 2);

    window.addEventListener('resize', invokeFeatureScroll);
    return () => window.removeEventListener('resize', invokeFeatureScroll);
  }, []);

  return (
    <div className={`portfolio ${mountAnimation ? 'data-mount-animation-fade-in' : ''}`} ref={portfolioRef}>
      <ProjectHub projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      <ProjectDetails projectSlideIndex={projectSlideIndex} />
      <ContactForm />
    </div>
  );
};

export default Portfolio;

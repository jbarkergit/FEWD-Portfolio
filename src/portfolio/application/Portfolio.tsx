import { useEffect, useRef, useState } from 'react';
import ProjectHub from './project-hub/ProjectHub';
import ProjectDetails from './project-details/ProjectDetails';
import ContactForm from './contact-form/ContactForm';
import EcommerceTechStack from './technology-stack/EcommerceTechStack';

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
  const [featureState, setFeatureState] = useState({
    projectDetailsActive: false,
    contactFormActive: false,
    techStackActive: false,
  });

  const useFeatureScroll = (index: number, scrollBehavior: ScrollBehavior) => {
    if (portfolioRef.current) {
      const project = portfolioRef.current.children[index] as HTMLElement;
      portfolioRef.current.scrollTo({ left: project.offsetLeft, top: project.offsetTop, behavior: scrollBehavior });
    }
  };

  const featureScrollHandler = (scrollBehavior: ScrollBehavior) => {
    switch (true) {
      case featureState.projectDetailsActive:
        useFeatureScroll(1, scrollBehavior);
        break;
      case featureState.contactFormActive:
        useFeatureScroll(2, scrollBehavior);
        break;
      case featureState.techStackActive:
        useFeatureScroll(3, scrollBehavior);
        break;
      default:
        useFeatureScroll(0, scrollBehavior);
        break;
    }
  };

  useEffect(() => featureScrollHandler('smooth'), [featureState]);

  useEffect(() => {
    const resetFeatureScroll = () => useFeatureScroll(0, 'instant');
    const invokeFeatureScroll = () => featureScrollHandler('instant');

    window.addEventListener('resize', invokeFeatureScroll);
    window.addEventListener('beforeunload', resetFeatureScroll);

    return () => {
      window.removeEventListener('resize', invokeFeatureScroll);
      window.removeEventListener('beforeunload', resetFeatureScroll);
    };
  }, []);

  return (
    <div className={`portfolio ${mountAnimation ? 'data-mount-animation-fade-in' : ''}`} ref={portfolioRef}>
      <ProjectHub projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      <ProjectDetails projectSlideIndex={projectSlideIndex} />
      <ContactForm />
      <EcommerceTechStack featureState={featureState} setFeatureState={setFeatureState} />
    </div>
  );
};

export default Portfolio;

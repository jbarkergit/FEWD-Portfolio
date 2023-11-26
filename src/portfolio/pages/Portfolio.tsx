import { useEffect, useRef, useState } from 'react';

//Navigation
import PortHeader from '../components/navigation/header/PortHeader';
import PortFooter from '../components/navigation/footer/PortFooter';

//Main
import PortfolioLanding from '../components/landing/PortfolioLanding';
import MainContent from '../components/carousel/ProjectCarousel';

//Features
import ContactForm from '../components/features/contact/ContactForm';
import EcommerceTechStack from '../components/features/tech-stack/EcommerceTechStack';
import ProjectDetails from '../components/features/project-details/ProjectDetails';

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
    useFeatureScroll(0, 'instant');
    const invokeFeatureScroll = () => featureScrollHandler('instant');

    window.addEventListener('resize', invokeFeatureScroll);
    return () => window.removeEventListener('resize', invokeFeatureScroll);
  }, []);

  return (
    <div className='portfolio' ref={portfolioRef}>
      <PortfolioLanding />

      <section className='projectHub'>
        <h2>Project hub</h2>
        <PortHeader
          mountAnimation={mountAnimation}
          projectSlideIndex={projectSlideIndex}
          setProjectSlideIndex={setProjectSlideIndex}
          featureState={featureState}
          setFeatureState={setFeatureState}
        />
        <MainContent mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} />
        <PortFooter mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      </section>

      <ProjectDetails projectSlideIndex={projectSlideIndex} />
      <ContactForm />
      <EcommerceTechStack featureState={featureState} setFeatureState={setFeatureState} />
    </div>
  );
};

export default Portfolio;

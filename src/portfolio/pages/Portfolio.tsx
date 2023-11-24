import { useEffect, useRef, useState } from 'react';

//Navigation
import PortHeader from '../components/navigation/header/PortHeader';
import PortFooter from '../components/navigation/footer/PortFooter';

//Main
import MainContent from '../components/main/MainContent';

//Features
import ContactForm from './ContactForm';
import EcommerceTechStack from '../components/features/tech-stack/EcommerceTechStack';
import ProjectDetails from '../components/features/project-details/ProjectDetails';

const Portfolio = (): JSX.Element => {
  /** Active project slide index tracker */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  /** Mount Animation */
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [mountAnimation, setMountAnimation] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setMountAnimation(false), 350);
  }, [portfolioRef.current]);

  /** Component transitions */
  const portfolioWrapper = useRef<HTMLDivElement>(null);

  const [featureState, setFeatureState] = useState({
    projectDetailsActive: false,
    contactFormActive: false,
    techStackActive: false,
  });

  const setPortfolioCoordinates = (value: number) => {
    if (portfolioWrapper.current)
      portfolioWrapper.current.scrollTo({
        left: value,
        top: 0,
        behavior: 'smooth',
      });
  };

  useEffect(() => {
    const portfolioWidth = portfolioWrapper.current?.scrollWidth || 0;
    const featurePosition = portfolioWidth / 3 || 0;

    switch (true) {
      case featureState.projectDetailsActive:
        setPortfolioCoordinates(featurePosition * 1);
        break;
      case featureState.contactFormActive:
        setPortfolioCoordinates(featurePosition * 2);
        break;
      case featureState.techStackActive:
        setPortfolioCoordinates(featurePosition * 3);
        break;
      default:
        break;
    }
  }, [featureState, portfolioWrapper]);

  return (
    <div id='portfolioWrapper' ref={portfolioWrapper}>
      <section id='portfolio' ref={portfolioRef}>
        <h2>Project Hub</h2>
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

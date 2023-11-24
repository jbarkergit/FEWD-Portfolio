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

  const setPortfolioCoordinates = (xCoordinate: number, behaviorType: ScrollBehavior) => {
    if (portfolioWrapper.current)
      portfolioWrapper.current.scrollTo({
        left: xCoordinate,
        behavior: behaviorType,
      });
  };

  const portfolioScrollWidth: number = portfolioWrapper.current?.scrollWidth || 0;
  const featureXPos: number = portfolioScrollWidth / Object.values(featureState).length;

  useEffect(() => {
    switch (true) {
      case featureState.projectDetailsActive:
        setPortfolioCoordinates(0, 'smooth');
        break;
      case featureState.contactFormActive:
        setPortfolioCoordinates(featureXPos * 2, 'smooth');
        break;
      case featureState.techStackActive:
        setPortfolioCoordinates(featureXPos * 3, 'smooth');
        break;
      default:
        setPortfolioCoordinates(0, 'instant');
        break;
    }
  }, [featureState]);

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

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

  const setPortfolioXCoordinate = (xCoordinate: number, behaviorType: ScrollBehavior) => {
    if (portfolioWrapper.current)
      portfolioWrapper.current.scrollTo({
        left: xCoordinate,
        behavior: behaviorType,
      });
  };

  const portfolioWidth = portfolioWrapper.current?.scrollWidth || 0;
  const featurePosition = portfolioWidth / 3;

  useEffect(() => {
    switch (true) {
      case featureState.projectDetailsActive:
        setPortfolioXCoordinate(featurePosition * 1, 'smooth');
        break;
      case featureState.contactFormActive:
        setPortfolioXCoordinate(featurePosition * 2, 'smooth');
        break;
      case featureState.techStackActive:
        setPortfolioXCoordinate(featurePosition * 3, 'smooth');
        break;
      default:
        break;
    }
  }, [featureState]);

  useEffect(() => setPortfolioXCoordinate(featurePosition * 1, 'instant'), []);

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

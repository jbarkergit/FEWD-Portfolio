import { useEffect, useRef, useState } from 'react';

//Navigation
import PortHeader from '../components/navigation/header/PortHeader';
import PortFooter from '../components/navigation/footer/PortFooter';

//Main
import MainContent from '../components/main/MainContent';

//Features
import ContactForm from '../components/features/contact/ContactForm';
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
  const [featureState, setFeatureState] = useState({
    projectDetailsActive: false,
    contactFormActive: false,
    techStackActive: false,
  });

  const setPortfolioCoordinates = (xCoordinate: number, behaviorType: ScrollBehavior) => {
    if (portfolioRef.current)
      portfolioRef.current.scrollTo({
        left: xCoordinate,
        behavior: behaviorType,
      });
  };

  useEffect(() => {
    const portfolioRefWidth: number = portfolioRef.current?.scrollWidth as number;
    // const featureStateLength: number = Object.values(featureState).length + 1;
    const featureXPos = portfolioRefWidth / 2;

    switch (true) {
      case featureState.projectDetailsActive:
        setPortfolioCoordinates(featureXPos, 'smooth');
        break;
      case featureState.contactFormActive:
        setPortfolioCoordinates(featureXPos * 2, 'smooth');
        break;
      case featureState.techStackActive:
        setPortfolioCoordinates(featureXPos * 2, 'smooth');
        break;
      default:
        setPortfolioCoordinates(0, 'instant');
        break;
    }
  }, [featureState, portfolioRef.current]);

  useEffect(() => {
    const resetPortfolioCoordinates = () => setPortfolioCoordinates(0, 'instant');
    window.addEventListener('unload', resetPortfolioCoordinates);
    return () => window.removeEventListener('unload', resetPortfolioCoordinates);
  }, []);

  return (
    <div className='portfolio' ref={portfolioRef}>
      <section className='portfolio__projectHub'>
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

      <section className='portfolio__features'>
        <h2>Features</h2>
        {featureState.projectDetailsActive ? <ProjectDetails projectSlideIndex={projectSlideIndex} /> : null}
        {featureState.contactFormActive ? <ContactForm /> : null}
        {featureState.techStackActive ? <EcommerceTechStack featureState={featureState} setFeatureState={setFeatureState} /> : null}
      </section>
    </div>
  );
};

export default Portfolio;

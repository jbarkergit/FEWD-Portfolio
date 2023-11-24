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
  const [featureState, setFeatureState] = useState({
    projectDetailsActive: false,
    contactFormActive: false,
    techStackActive: false,
  });

  return (
    <div id='portfolioWrapper'>
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
      <ContactForm />
      <EcommerceTechStack featureState={featureState} setFeatureState={setFeatureState} />
      <ProjectDetails projectSlideIndex={projectSlideIndex} />
    </div>
  );
};

export default Portfolio;

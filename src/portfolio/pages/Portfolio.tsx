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

  /** Page transitions */
  const [contactFormActive, setContactFormActive] = useState<boolean>(false);
  const [techStackActive, setTechStackActive] = useState<boolean>(false);

  return (
    <div id='portfolio' ref={portfolioRef}>
      <PortHeader
        mountAnimation={mountAnimation}
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        contactFormActive={contactFormActive}
        setContactFormActive={setContactFormActive}
        techStackActive={techStackActive}
        setTechStackActive={setTechStackActive}
      />
      <ContactForm />
      <EcommerceTechStack techStackActive={techStackActive} setTechStackActive={setTechStackActive} />
      {/* <ProjectDetails projectSlideIndex={projectSlideIndex} /> */}
      <MainContent mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} />
      <PortFooter mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} />
    </div>
  );
};

export default Portfolio;

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
  /** Global state trackers
   * Current Active Project Slide
   * Contact Form Modal render state
   * TechStack Modal render state
   */

  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);
  const [contactFormActive, setContactFormActive] = useState<boolean>(false);
  const [techStackActive, setTechStackActive] = useState<boolean>(false);

  /** Mount Animation */
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [mountAnimation, setMountAnimation] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setMountAnimation(false), 350);
  }, [portfolioRef.current]);

  return (
    <div id='portfolio' ref={portfolioRef}>
      <PortHeader
        mountAnimation={mountAnimation}
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        setContactFormActive={setContactFormActive}
        setTechStackActive={setTechStackActive}
      />
      {/* <ContactForm contactFormActive={contactFormActive} setContactFormActive={setContactFormActive} /> */}
      <EcommerceTechStack techStackActive={techStackActive} setTechStackActive={setTechStackActive} />
      {/* <ProjectDetails projectSlideIndex={projectSlideIndex} /> */}
      <MainContent mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} />
      <PortFooter mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} />
    </div>
  );
};

export default Portfolio;

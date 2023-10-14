import { useEffect, useState } from 'react';

//Navigation
import PortHeader from '../components/navigation/header/PortHeader';
import PortFooter from '../components/navigation/footer/PortFooter';

//Main
import MainContent from '../components/main/MainContent';
import ProjectDetails from '../components/features/project-details/ProjectDetails';

//Features
import ContactForm from '../components/features/contact/ContactForm';
import EcommerceTechStack from '../components/features/tech-stack/EcommerceTechStack';

const Portfolio = (): JSX.Element => {
  // INDEX TRACKER: Current Active Project Slide
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  // ACTIVE STATUS TRACKER: Contact Form Modal
  const [contactFormActive, setContactFormActive] = useState<boolean>(false);

  // ACTIVE STATUS TRACKER: TechStack Modal
  const [techStackActive, setTechStackActive] = useState<boolean>(false);

  //** */
  // ANIMATION INITIATOR: Main Slider
  const [mainAnimator, setMainAnimator] = useState<boolean>(false);

  // ANIMATION INITIATION: Main Slider Boolean setter (IF contactForm !== false, IF techStackActive !== false)
  useEffect(() => {
    if (contactFormActive || techStackActive) setMainAnimator(true);
    else setMainAnimator(false);
  }, [contactFormActive, techStackActive]);
  //* */

  //** */
  // ACTIVE STATUS TRACKER: Project Information Extension
  const [projectInfoActive, setProjectInfoActive] = useState<boolean>(false);

  // Project Information Article Style Toggle (Abridged OR Extended with Developer Insight)
  const [projectInfoStyle, setProjectInfoStyle] = useState<string>('');

  // Project Information Style Extension Toggle: #portfolio Height Extension
  useEffect(() => (projectInfoStyle !== '' ? setProjectInfoActive(true) : setProjectInfoActive(false)), [projectInfoStyle]);
  //** */

  return (
    <div id='portfolio' style={projectInfoActive && projectSlideIndex !== 1 ? { height: 'auto' } : { height: '100vh' }}>
      <PortHeader
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        setContactFormActive={setContactFormActive}
        setTechStackActive={setTechStackActive}
      />
      <ContactForm contactFormActive={contactFormActive} setContactFormActive={setContactFormActive} />
      <EcommerceTechStack techStackActive={techStackActive} setTechStackActive={setTechStackActive} />
      <ProjectDetails projectInfoStyle={projectInfoStyle} setProjectInfoStyle={setProjectInfoStyle} projectSlideIndex={projectSlideIndex} />
      <MainContent
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        projectInfoStyle={projectInfoStyle}
        mainAnimator={mainAnimator}
        setMainAnimator={setMainAnimator}
      />
      <PortFooter projectSlideIndex={projectSlideIndex} setProjectInfoStyle={setProjectInfoStyle} />
    </div>
  );
};

export default Portfolio;

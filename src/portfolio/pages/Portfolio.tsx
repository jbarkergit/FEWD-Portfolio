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
  //** INDEX TRACKER: Current Active Project Slide */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  //** ACTIVE STATUS TRACKER: Contact Form Modal */
  const [contactFormActive, setContactFormActive] = useState<boolean>(false);

  //** ACTIVE STATUS TRACKER: TechStack Modal */
  const [techStackActive, setTechStackActive] = useState<boolean>(false);

  //** ANIMATION INITIATOR: Main Slider Boolean setter (IF contactForm !== false, IF techStackActive !== false) */
  const [mainAnimator, setMainAnimator] = useState<boolean>(false);

  useEffect(() => {
    if (contactFormActive || techStackActive) setMainAnimator(true);
    else setMainAnimator(false);
  }, [contactFormActive, techStackActive]);

  //** LAYOUT TRACKER */
  const [layout, setLayout] = useState<string>('column');

  return (
    <div id='portfolio'>
      <PortHeader
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        setContactFormActive={setContactFormActive}
        setTechStackActive={setTechStackActive}
      />
      <ContactForm contactFormActive={contactFormActive} setContactFormActive={setContactFormActive} />
      <EcommerceTechStack techStackActive={techStackActive} setTechStackActive={setTechStackActive} />
      {/* <ProjectDetails projectSlideIndex={projectSlideIndex} /> */}
      <MainContent
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        mainAnimator={mainAnimator}
        setMainAnimator={setMainAnimator}
        layout={layout}
        setLayout={setLayout}
      />
      <PortFooter projectSlideIndex={projectSlideIndex} layout={layout} setLayout={setLayout} />
    </div>
  );
};

export default Portfolio;

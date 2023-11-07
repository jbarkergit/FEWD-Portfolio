import { useState } from 'react';

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
  //** INDEX TRACKER: Current Active Project Slide */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  //** ACTIVE STATUS TRACKER: Contact Form Modal */
  const [contactFormActive, setContactFormActive] = useState<boolean>(false);

  //** ACTIVE STATUS TRACKER: TechStack Modal */
  const [techStackActive, setTechStackActive] = useState<boolean>(false);

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
      <MainContent projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} />
      <PortFooter projectSlideIndex={projectSlideIndex} />
    </div>
  );
};

export default Portfolio;

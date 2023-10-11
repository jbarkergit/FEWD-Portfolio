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
  const [stateIndex, setStateIndex] = useState<number>(0);

  // ACTIVE STATUS TRACKER: Contact Form Modal
  const [contactForm, setContactForm] = useState<boolean>(false);

  // ACTIVE STATUS TRACKER: TechStack Modal
  const [techStackFeatureOpen, setTechStackFeatureOpen] = useState<boolean>(false);

  // Project Information Article Toggle (Abridged OR Extended with Developer Insight)
  const [projectDetail, setProjectDetail] = useState<string>('');
  // ACTIVE STATUS TRACKER: Project Information Extension
  const [projectDetailOpen, setProjectDetailOpen] = useState<boolean>(false);
  // STYLE TOGGLE: #portfolio Height Extension
  useEffect(() => (projectDetail !== '' ? setProjectDetailOpen(true) : setProjectDetailOpen(false)), [projectDetail]);

  return (
    <div id='portfolio' style={projectDetailOpen && stateIndex !== 1 ? { height: 'auto' } : { height: '100vh' }}>
      <PortHeader stateIndex={stateIndex} setStateIndex={setStateIndex} setContactForm={setContactForm} setTechStackFeatureOpen={setTechStackFeatureOpen} />
      <ContactForm contactForm={contactForm} setContactForm={setContactForm} />
      <EcommerceTechStack techStackFeatureOpen={techStackFeatureOpen} setTechStackFeatureOpen={setTechStackFeatureOpen} />
      <ProjectDetails projectDetail={projectDetail} setProjectDetail={setProjectDetail} stateIndex={stateIndex} />
      <MainContent stateIndex={stateIndex} setStateIndex={setStateIndex} projectDetail={projectDetail} />
      <PortFooter stateIndex={stateIndex} projectDetail={projectDetail} setProjectDetail={setProjectDetail} />
    </div>
  );
};

export default Portfolio;

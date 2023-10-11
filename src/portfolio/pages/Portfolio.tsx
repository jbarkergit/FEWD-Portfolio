import { useEffect, useState } from 'react';

//Navigation
import PortHeader from '../components/navigation/header/PortHeader';
import PortFooter from '../components/navigation/footer/PortFooter';

//Main
import MainContent from '../components/main/MainContent';
import ProjectDetails from '../components/features/project-details/ProjectDetails';

//Features
import ContactForm from '../components/features/contact/ContactForm';

const Portfolio = (): JSX.Element => {
  const [stateIndex, setStateIndex] = useState<number>(0);
  const [projectDetail, setProjectDetail] = useState<string>('');
  const [projectDetailOpen, setProjectDetailOpen] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState<boolean>(false);

  // Boolean check for #portfolio height toggle
  useEffect(() => (projectDetail !== '' ? setProjectDetailOpen(true) : setProjectDetailOpen(false)), [projectDetail]);

  return (
    <div id='portfolio' style={projectDetailOpen && stateIndex !== 1 ? { height: 'auto' } : { height: '100vh' }}>
      <PortHeader stateIndex={stateIndex} setStateIndex={setStateIndex} setContactForm={setContactForm} />
      <ContactForm contactForm={contactForm} setContactForm={setContactForm} />
      <ProjectDetails projectDetail={projectDetail} setProjectDetail={setProjectDetail} stateIndex={stateIndex} />
      <MainContent stateIndex={stateIndex} setStateIndex={setStateIndex} projectDetail={projectDetail} />
      <PortFooter stateIndex={stateIndex} projectDetail={projectDetail} setProjectDetail={setProjectDetail} />
    </div>
  );
};

export default Portfolio;

import { useState } from 'react';
import PortHeader from '../components/navigation/header/PortHeader';
import MainContent from '../components/main/MainContent';
import PortFooter from '../components/navigation/footer/PortFooter';
import Contact from '../components/contact/Contact';

const Portfolio = (): JSX.Element => {
  const [stateIndex, setStateIndex] = useState<number>(0);
  const [contactForm, setContactForm] = useState<boolean>(false);

  return (
    <div id="portfolio">
      <PortHeader stateIndex={stateIndex} setStateIndex={setStateIndex} contactForm={contactForm} setContactForm={setContactForm} />
      {contactForm ? (
        <div className="sideWithMain">
          <Contact />
          <MainContent stateIndex={stateIndex} setStateIndex={setStateIndex} />
        </div>
      ) : (
        <>
          <MainContent stateIndex={stateIndex} setStateIndex={setStateIndex} />
        </>
      )}
      <PortFooter stateIndex={stateIndex} />
    </div>
  );
};

export default Portfolio;

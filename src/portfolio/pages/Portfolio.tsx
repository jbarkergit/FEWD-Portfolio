import { useState } from 'react';
import PortHeader from '../components/navigation/header/PortHeader';
import MainContent from '../components/main/MainContent';
import DeveloperDialog from '../components/dialog/DeveloperDialog';
import PortFooter from '../components/navigation/footer/PortFooter';

const Portfolio = (): JSX.Element => {
  const [stateIndex, setStateIndex] = useState<number>(0);

  return (
    <div id="portfolio">
      <PortHeader stateIndex={stateIndex} setStateIndex={setStateIndex} />
      <DeveloperDialog />
      <MainContent stateIndex={stateIndex} setStateIndex={setStateIndex} />
      <PortFooter stateIndex={stateIndex} />
    </div>
  );
};

export default Portfolio;

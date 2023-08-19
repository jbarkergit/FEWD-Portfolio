import { useState } from 'react';
import PortHeader from '../components/navigation/header/PortHeader';
import MainContent from '../components/main/MainContent';
import DeveloperDialog from '../components/dialog/DeveloperDialog';
import PortFooter from '../components/navigation/footer/PortFooter';

const Portfolio = (): JSX.Element => {
  const [stateIndex, setStateIndex] = useState<number>(0);
  const [showDialog, setShowDialog] = useState<boolean | null>(false);
  const [dialogTab, setDialogTab] = useState<string | null>('contact');

  return (
    <div id="portfolio">
      <PortHeader
        stateIndex={stateIndex}
        setStateIndex={setStateIndex}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        dialogTab={dialogTab}
        setDialogTab={setDialogTab}
      />
      <DeveloperDialog showDialog={showDialog} setShowDialog={setShowDialog} dialogTab={dialogTab} setDialogTab={setDialogTab} />
      <MainContent stateIndex={stateIndex} setStateIndex={setStateIndex} />
      <PortFooter stateIndex={stateIndex} />
    </div>
  );
};

export default Portfolio;

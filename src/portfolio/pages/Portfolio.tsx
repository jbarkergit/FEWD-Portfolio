import { useState } from 'react';
import PortHeader from '../components/header/PortHeader';
import MainContent from '../components/main/MainContent';
import DeveloperDialog from '../components/dialog/DeveloperDialog';

const Portfolio = (): JSX.Element => {
  const [closestIndex, setClosestIndex] = useState<number>(0);
  const [showDialog, setShowDialog] = useState<boolean | null>(false);
  const [dialogTab, setDialogTab] = useState<string | null>('contact');
  return (
    <div id="portfolio">
      <PortHeader
        closestIndex={closestIndex}
        setClosestIndex={setClosestIndex}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        dialogTab={dialogTab}
        setDialogTab={setDialogTab}
      />
      <DeveloperDialog showDialog={showDialog} setShowDialog={setShowDialog} dialogTab={dialogTab} setDialogTab={setDialogTab} />
      <MainContent closestIndex={closestIndex} setClosestIndex={setClosestIndex} />
    </div>
  );
};

export default Portfolio;

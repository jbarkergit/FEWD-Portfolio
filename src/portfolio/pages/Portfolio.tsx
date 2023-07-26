import PortHeader from '../components/header/PortHeader';
import MainContent from '../components/main/MainContent';
import PortFooter from '../components/footer/PortFooter';
import DeveloperDialog from '../components/dialog/DeveloperDialog';
import { DialogContextProvider, useDialogContext } from '../context/DialogContext';

const Dialog = () => {
  // @ts-ignore
  const { showDialog } = useDialogContext();
  return showDialog ? <DeveloperDialog /> : null;
};

const Portfolio = (): JSX.Element => {
  return (
    <div id="portfolio">
      <DialogContextProvider>
        <PortHeader />
        <Dialog />
      </DialogContextProvider>
      <MainContent />
      <PortFooter />
    </div>
  );
};

export default Portfolio;

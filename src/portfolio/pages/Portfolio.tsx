import PortHeader from '../components/header/PortHeader';
import MainContent from '../components/main/MainContent';
import PortFooter from '../components/footer/PortFooter';
import DeveloperDialog from '../components/dialog/DeveloperDialog';
import { DialogContextProvider, useDialogContext } from '../context/DialogContext';
import { ClosestIndexContextProvider } from '../context/ClosestIndex';

const Dialog = () => {
  // @ts-ignore
  const { showDialog } = useDialogContext();
  return showDialog ? <DeveloperDialog /> : null;
};

const Portfolio = (): JSX.Element => {
  return (
    <div id="portfolio">
      <ClosestIndexContextProvider>
        <DialogContextProvider>
          <PortHeader />
          <Dialog />
        </DialogContextProvider>
        <MainContent />
      </ClosestIndexContextProvider>
      <PortFooter />
    </div>
  );
};

export default Portfolio;

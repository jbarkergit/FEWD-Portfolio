import { useState } from 'react';
import LogoArea from './sections/LogoArea';
import NavigationLinks from './sections/NavigationLinks';
import UserInteractions from './sections/UserInteractions';
import ModalFeatures from './ModalFeatures';

const PrimaryNav = (): JSX.Element => {
  const [uiModal, setUiModal] = useState<string>('');

  return (
    <>
      <header className='navkit'>
        <LogoArea />
        <NavigationLinks />
        <UserInteractions uiModal={uiModal} setUiModal={setUiModal} />
      </header>
      <ModalFeatures uiModal={uiModal} setUiModal={setUiModal} />
    </>
  );
};

export default PrimaryNav;

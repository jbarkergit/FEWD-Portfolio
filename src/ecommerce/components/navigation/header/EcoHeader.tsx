import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInteractions from './sections/UserInteractions';
import ModalFeatures from '../../features/ModalFeatures';
import EcoNavigationLinks from '../links/EcoNavigationLinks';

const EcoHeader = (): JSX.Element => {
  const [uiModal, setUiModal] = useState<string>('');

  return (
    <>
      <header className='navkit'>
        <section className='navkit__section'>
          <Link to='/ecommerce'>Dynamic Audio</Link>
        </section>
        <section className='navkit__section'>
          <nav className='navkit__section'>
            <ul className='navkit__section__links'>
              <EcoNavigationLinks />
            </ul>
          </nav>
        </section>
        <UserInteractions uiModal={uiModal} setUiModal={setUiModal} />
      </header>
      <ModalFeatures uiModal={uiModal} setUiModal={setUiModal} />
    </>
  );
};

export default EcoHeader;

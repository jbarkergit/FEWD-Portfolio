import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInteractions from './sections/UserInteractions';
import ModalFeatures from '../../features/ModalFeatures';

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
              <li>
                <Link to='/ecommerce/products'>{'All Products'}</Link>
              </li>
              <li>
                <Link to='/ecommerce/headphones'>{'Headphones'}</Link>
              </li>
              <li>
                <Link to='/ecommerce/amps-dacs'>{'Amps & Dacs'}</Link>
              </li>
              <li>
                <Link to='/ecommerce/microphones'>{'Microphones'}</Link>
              </li>
              <li>
                <Link to='/ecommerce/interfaces'>{'Interfaces'}</Link>
              </li>
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

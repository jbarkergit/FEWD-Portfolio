import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInteractions from './sections/UserInteractions';
import ModalFeatures from '../../features/ModalFeatures';
import { useUniqueData } from '../../../hooks/useUniqueData';

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
                <Link to='/ecommerce/products'>All Products</Link>
              </li>
              {useUniqueData().useUniqueCategories.map((category) => {
                if (category === 'amps-dacs') {
                  return (
                    <li key={category}>
                      <Link to={`/ecommerce/${category}`}>Amps & Dacs</Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={category}>
                      <Link to={`/ecommerce/${category}`}>{category}</Link>
                    </li>
                  );
                }
              })}
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

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../../context/CategoryFilterContext';

type MobileMenuType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const MobileMenu = ({ uiModal, setUiModal }: MobileMenuType): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const mobileModal = useRef<HTMLDivElement>(null);

  useEffect(() => mobileModal.current?.setAttribute('data-status', uiModal === 'mobileMenu' ? 'active' : 'false'), [uiModal]);

  useEffect(() => {
    const handleExteriorClick = (e: PointerEvent) => {
      if (!mobileModal.current?.contains(e.target as Node) && !(e.target as HTMLButtonElement).classList.contains('navkit__section__mobileMenuBtn')) setUiModal('');
    };

    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, []);

  return (
    <div className='modalWrapper'>
      <aside className='ecoModal ecoModalCart' data-status='false' ref={mobileModal}>
        <div className='ecoModal__simpleHeading'>
          <Link to='/ecommerce'>Dynamic Audio</Link>
        </div>
        <nav className='ecoModal__nav'>
          <ul className='ecoModal__nav__ul'>
            <li className='ecoModal__nav__ul__li'>
              <Link to='/ecommerce/headphones' onClick={() => setCategoryFilter('')}>
                {'Shop Headphones'}
              </Link>
            </li>
            <li className='ecoModal__nav__ul__li'>
              <Link to='/ecommerce/amps-dacs' onClick={() => setCategoryFilter('headphone')}>
                {'Shop Amps & Dacs'}
              </Link>
            </li>
            <li className='ecoModal__nav__ul__li'>
              <Link to='/ecommerce/microphones' onClick={() => setCategoryFilter('amp', 'dac')}>
                {'Shop Microphones'}
              </Link>
            </li>
            <li className='ecoModal__nav__ul__li'>
              <Link to='/ecommerce/interfaces' onClick={() => setCategoryFilter('microphone')}>
                {'Shop Interfaces'}
              </Link>
            </li>
            <li className='ecoModal__nav__ul__li'>
              <Link to='/ecommerce/products' onClick={() => setCategoryFilter('interface')}>
                {'Browse All Products'}
              </Link>
            </li>
            <li className='ecoModal__nav__ul__li'>
              <button aria-label='Close menu' onClick={() => setUiModal('')}>
                <svg xmlns='http://www.w3.org/2000/svg' width='1.6em' height='1.6em' viewBox='0 0 24 24'>
                  <path
                    fill='#ffffff'
                    d='M9 19q-.5 0-.938-.225t-.712-.625l-3.525-5Q3.45 12.625 3.45 12t.375-1.15l3.525-5q.275-.4.713-.625T9 5h10q.825 0 1.413.588T21 7v10q0 .825-.588 1.413T19 19H9Zm5-5.6l1.9 1.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L15.4 12l1.9-1.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L14 10.6l-1.9-1.9q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l1.9 1.9l-1.9 1.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l1.9-1.9Z'></path>
                </svg>
                Return
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;

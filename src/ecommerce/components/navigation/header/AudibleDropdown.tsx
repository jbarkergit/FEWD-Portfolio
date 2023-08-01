import { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const AudibleDropdown = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const audibleDropdownRef = useRef<HTMLUListElement>(null!);

  function useAudibleDropdown(): void {
    audibleDropdownRef.current.getAttribute('data-activity') == 'inactive'
      ? audibleDropdownRef.current.setAttribute('data-activity', 'active')
      : audibleDropdownRef.current.setAttribute('data-activity', 'inactive');
  }

  return (
    <li className="dropMenu" onClick={useAudibleDropdown}>
      <div
        className="dropMenu__indicator"
        style={{
          color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.1em" viewBox="0 0 24 24">
          <g fill="none" stroke="#ffffff" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10"></circle>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 8.5l3 3l3-3m-6 4l3 3l3-3"></path>
          </g>
        </svg>
        Audible
      </div>
      <div>
        <ul className="dropMenu__links" data-activity="inactive" ref={audibleDropdownRef}>
          <li className="dropMenu__links__link">
            <Link
              to="/ecommerce/headphones"
              style={{
                color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
              }}
              onClick={() => setCategoryFilter('headphone')}
            >
              {'Headphones'}
            </Link>
          </li>
          <li className="dropMenu__links__link">
            <Link
              to="/ecommerce/amps-dacs"
              style={{
                color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
              }}
              onClick={() => setCategoryFilter('amp', 'dac')}
            >
              {'Amps & Dacs'}
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default AudibleDropdown;

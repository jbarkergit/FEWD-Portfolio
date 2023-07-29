import { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/categoryFilter/StateContextProvider';

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
        <span className="dropMenu__indicator--interior">
          Audible <i className="fa-solid fa-angle-down"></i>
        </span>
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

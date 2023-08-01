import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const VocalDropdown = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const vocalDropdownRef = useRef<HTMLUListElement>(null!);

  function useVocalDropdown(): void {
    vocalDropdownRef.current.getAttribute('data-activity') == 'inactive'
      ? vocalDropdownRef.current.setAttribute('data-activity', 'active')
      : vocalDropdownRef.current.setAttribute('data-activity', 'inactive');
  }

  return (
    <li
      className="dropMenu"
      onClick={useVocalDropdown}
      style={{
        color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
      }}
    >
      <div className="dropMenu__indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.1em" viewBox="0 0 24 24">
          <g fill="none" stroke="#ffffff" strokeWidth="2.2">
            <circle cx="12" cy="12" r="10"></circle>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 8.5l3 3l3-3m-6 4l3 3l3-3"></path>
          </g>
        </svg>
        Vocal
      </div>
      <ul className="dropMenu__links" data-activity="inactive" ref={vocalDropdownRef}>
        <li className="dropMenu__links__link">
          <Link
            to="/ecommerce/microphones"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('microphone')}
          >
            {'Microphones'}
          </Link>
        </li>
        <li className="dropMenu__links__link">
          <Link
            to="/ecommerce/interfaces"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            }}
            onClick={() => setCategoryFilter('interface')}
          >
            {'Interfaces'}
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default VocalDropdown;

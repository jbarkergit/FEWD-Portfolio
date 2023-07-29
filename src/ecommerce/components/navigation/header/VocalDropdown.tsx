import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/categoryFilter/StateContextProvider';

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
    <li className="dropMenu" onClick={useVocalDropdown}>
      <div
        className="dropMenu__indicator"
        style={{
          color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
        }}
      >
        <span className="dropMenu__indicator--interior">
          Vocal <i className="fa-solid fa-angle-down"></i>
        </span>
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

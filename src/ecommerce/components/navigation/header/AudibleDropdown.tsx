import { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const AudibleDropdown = (): JSX.Element => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  const audibleDropdownRef = useRef<HTMLUListElement>(null!);
  const [dropDownStatus, setDropDownStatus] = useState<boolean>(false);

  const toggleDropDown = (): void => setDropDownStatus(dropDownStatus ? false : true);
  useEffect(() => audibleDropdownRef.current?.setAttribute('data-status', dropDownStatus ? 'active' : 'false'), [dropDownStatus]);

  return (
    <li className="dropMenu" onClick={toggleDropDown}>
      <div
        className="dropMenu__indicator"
        style={{
          color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.1em" viewBox="0 0 24 24">
          <g
            fill={useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 20%)'}
            stroke={useLocation().pathname === '/ecommerce' ? 'rgb(51, 51, 51)' : 'hsl(0, 0%, 100%)'}
            strokeWidth={useLocation().pathname === '/ecommerce' ? '1.8' : '2.2'}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 8.5l3 3l3-3m-6 4l3 3l3-3"></path>
          </g>
        </svg>
        Audible
      </div>
      <ul className="dropMenu__links" data-status="false" ref={audibleDropdownRef}>
        <li className="dropMenu__links__link">
          <Link
            to="/ecommerce/headphones"
            style={{
              color: useLocation().pathname === '/ecommerce' ? 'white' : 'black',
            }}
            onClick={() => setCategoryFilter('headphone')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill={useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 100%)' : 'hsl(0, 0%, 19.607843137254903%)'}>
                <path
                  fillRule="evenodd"
                  d="M10.512 4.43a.75.75 0 0 0-.081 1.058L16.012 12l-5.581 6.512a.75.75 0 1 0 1.138.976l6-7a.75.75 0 0 0 0-.976l-6-7a.75.75 0 0 0-1.057-.081Z"
                  clipRule="evenodd"
                ></path>
                <path d="M6.25 5a.75.75 0 0 1 1.32-.488l6 7a.75.75 0 0 1 0 .976l-6 7A.75.75 0 0 1 6.25 19V5Z"></path>
              </g>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill="#ffffff">
                <path
                  fillRule="evenodd"
                  d="M10.512 4.43a.75.75 0 0 0-.081 1.058L16.012 12l-5.581 6.512a.75.75 0 1 0 1.138.976l6-7a.75.75 0 0 0 0-.976l-6-7a.75.75 0 0 0-1.057-.081Z"
                  clipRule="evenodd"
                ></path>
                <path d="M6.25 5a.75.75 0 0 1 1.32-.488l6 7a.75.75 0 0 1 0 .976l-60-.075.75 0 0 1 6.25 19V5Z"></path>
              </g>
            </svg>
            {'Amps & Dacs'}
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default AudibleDropdown;

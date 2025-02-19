import { useEffect, useMemo, useRef, type JSX } from 'react';
import { Link } from 'react-router';
import { projectData } from '~/portfolio/data/projectData';

// Nav Btn JSX
const NavBtn = ({ label, func }: { label: 'About' | 'Contact' | 'Storm History'; func: () => void }) => {
  const svgs: {
    About: JSX.Element;
    Contact: JSX.Element;
    'Storm History': JSX.Element;
  } = {
    About: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <circle cx='10' cy='8' r='4' fill='currentColor'></circle>
        <path
          fill='currentColor'
          d='M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99m9.08 4.01c.36-.59.57-1.28.57-2.02c0-2.21-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22L22 20.59zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2'></path>
      </svg>
    ),
    Contact: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          fill='currentColor'
          d='M11.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10s-4.48-10-10-10m3.61 6.34c1.07 0 1.93.86 1.93 1.93s-.86 1.93-1.93 1.93s-1.93-.86-1.93-1.93c-.01-1.07.86-1.93 1.93-1.93m-6-1.58c1.3 0 2.36 1.06 2.36 2.36s-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36m0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96c1.05-1.12 3.67-1.69 5.14-1.69c.53 0 1.2.08 1.9.22c-1.64.87-1.9 2.02-1.9 2.68M11.99 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13c1.07 0 2.92.39 3.84 1.15c-1.17 2.97-4.06 5.09-7.45 5.09'
        />
      </svg>
    ),
    'Storm History': (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          fill='currentColor'
          d='M18 11c1.49 0 2.87.47 4 1.26V8c0-1.11-.89-2-2-2h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h7.68A6.995 6.995 0 0 1 18 11m-8-7h4v2h-4z'
        />
        <path fill='currentColor' d='M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m1.65 7.35L17.5 18.2V15h1v2.79l1.85 1.85z' />
      </svg>
    ),
  };

  return (
    <li className='hubNav__content__ul__li'>
      <button className='hubNav__content__ul__li__btn' aria-label={label} onClick={() => func()}>
        <span className='hubNav__content__ul__li__btn__title'>{label}</span>
        <picture className='hubNav__content__ul__li__btn__display'>{svgs[label]}</picture>
      </button>
    </li>
  );
};

const HubNav = () => {
  const hubNav = useRef<HTMLElement>(null),
    bubble = useRef<HTMLButtonElement>(null),
    overlay = useRef<HTMLDivElement>(null);

  let isMenuOpen: boolean = false;

  // toggleNav func
  function toggleNav(): void {
    if (!hubNav.current) return;
    isMenuOpen ? hubNav.current.setAttribute('data-vis', 'false') : hubNav.current.setAttribute('data-vis', 'true');
    isMenuOpen ? (isMenuOpen = false) : (isMenuOpen = true);
  }

  // observePointer funcs
  const bubbleBounds = useMemo((): { bubbleX: number; bubbleY: number } | undefined => {
    if (!bubble.current) return;

    // Bubble bounds (overlay container)
    const bubbleRect: DOMRect = bubble.current.getBoundingClientRect();
    const bubbleX: number = bubbleRect.left + bubbleRect.width / 2;
    const bubbleY: number = bubbleRect.top + bubbleRect.height / 2;

    return {
      bubbleX: bubbleX,
      bubbleY: bubbleY,
    };
  }, []);

  function getAngle(cx: number, cy: number, ex: number, ey: number): number {
    const dy: number = ey - cy;
    const dx: number = ex - cx;
    const rad: number = Math.atan2(dy, dx);
    const deg: number = (rad * 180) / Math.PI;
    return deg;
  }

  function observePointer(event: PointerEvent): void {
    if (!bubble.current || !overlay.current || !bubbleBounds) return;
    const { clientX, clientY } = event;
    const { bubbleX, bubbleY } = bubbleBounds;
    const angleDegree: number = getAngle(clientX, clientY, bubbleX, bubbleY);
    overlay.current.style.transform = `rotate(${90 + angleDegree}deg)`;
  }

  useEffect(() => {
    document.body.addEventListener('pointermove', observePointer);
    return () => document.body.removeEventListener('pointermove', observePointer);
  }, [bubble.current, overlay.current, bubbleBounds]);

  // hubNav JSX
  return (
    <nav className='hubNav' ref={hubNav} data-vis='false'>
      <button className='hubNav__bubble' ref={bubble} aria-label='Show Navigation Menu' onClick={() => toggleNav()}>
        <div className='hubNav__bubble__overlay' ref={overlay} style={{ transform: `rotate(${160}deg)` }} />
        <svg className='hubNav__bubble--open' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path fill='currentColor' d='M6 17.59L7.41 19L12 14.42L16.59 19L18 17.59l-6-6z'></path>
          <path fill='currentColor' d='m6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z'></path>
        </svg>
        <svg className='hubNav__bubble--closed' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path fill='currentColor' d='M18 6.41L16.59 5L12 9.58L7.41 5L6 6.41l6 6z' />
          <path fill='currentColor' d='m18 13l-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z' />
        </svg>
      </button>
      <nav className='hubNav__content'>
        <ul className='hubNav__content__ul'>
          {projectData.map((project) => (
            <div className='mainContent__track__project' key={project.key}>
              <Link to={project.url} aria-label={`${project.key} Live Demo`}>
                <picture>
                  <img src={project.imgSrc} alt={project.imgAlt} rel='preload' loading='eager' draggable='false' decoding='async' fetchPriority='high' />
                </picture>
              </Link>
            </div>
          ))}
        </ul>
      </nav>
    </nav>
  );
};

export default HubNav;

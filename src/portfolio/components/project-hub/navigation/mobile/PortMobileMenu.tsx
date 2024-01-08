import { useRef } from 'react';
import { Link } from 'react-router-dom';

const PortMobileMenu = () => {
  /** Mobile Nav */
  const mobileNav = useRef<HTMLDivElement>(null);

  return (
    <section className='portMobileMenu'>
      <h2>Navigation Menu Links</h2>

      <div className='portMobileMenu__header'></div>

      <nav className='portMobileMenu__menu' id='mobile-menu-links' ref={mobileNav} data-status='disabled' aria-labelledby='mobile-menu-links'>
        <Link to='/ecommerce' id='mobile-menu-links'>
          Ecommerce Demo
        </Link>
        <Link to='https://github.com/jbarkergit' id='mobile-menu-links' target='_blank' aria-label='Visit GitHub Profile'>
          GitHub Profile
        </Link>
        <button id='mobile-menu-links' onClick={() => mobileNav.current?.setAttribute('data-status', 'disabled')}>
          Return to Projects
        </button>
      </nav>

      <div className='portMobileMenu__footer'></div>
    </section>
  );
};

export default PortMobileMenu;

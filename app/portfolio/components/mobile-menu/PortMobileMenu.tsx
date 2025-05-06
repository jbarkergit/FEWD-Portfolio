import { forwardRef } from 'react';
import type { Dispatch, ForwardedRef, SetStateAction } from 'react';
import { projectData } from '../../data/projectData';
import { Link } from 'react-router';

type PropDrillType = {
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  usePortMobileMenu: () => void;
};

const PortMobileMenu = forwardRef<HTMLElement, PropDrillType>(({ setProjectSlideIndex, usePortMobileMenu }: PropDrillType, ref: ForwardedRef<HTMLElement>) => {
  return (
    <section className='portMobileMenu' ref={ref} data-status={'false'}>
      <nav className='portMobileMenu__nav'>
        <section className='portMobileMenu__nav__header'>
          <div className='portMobileMenu__nav__header__block'>
            <button>Justin Barker</button>
          </div>
          <div className='portMobileMenu__nav__header__block'>
            <button className='carouselNav__section__mobile--menu' aria-label='Open link menu' onPointerUp={() => usePortMobileMenu()}>
              Menu
              <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
                <path fill='#000000' d='m12 15l-5-5h10z'></path>
              </svg>
            </button>
          </div>
        </section>
        <ul className='portMobileMenu__nav__projects' aria-labelledby='project-demo-navigation'>
          {projectData.map((_, index) => (
            <li className='portMobileMenu__nav__projects__li' key={_.key + index}>
              <button
                className='portMobileMenu__nav__projects__li--button'
                id='project-demo-navigation'
                aria-label={`View ${_.key} Project`}
                onPointerUp={() => setProjectSlideIndex(index)}>
                <span>0{index + 1}.</span>
                <span>{_.key}</span>
              </button>
            </li>
          ))}
        </ul>
        <section className='portMobileMenu__nav__footer'>
          <div className='portMobileMenu__nav__footer__block'>
            <span>Front End Developer</span>
          </div>
          <nav className='portMobileMenu__nav__footer__block'>
            <Link to='https://github.com/jbarkergit' id='external-links' target='_blank' aria-label='Visit GitHub Profile'>
              GitHub
            </Link>
            <Link to='https://leetcode.com/u/jbarkerlc/' id='external-links' target='_blank' aria-label='Visit LeetCode Profile'>
              LeetCode
            </Link>
          </nav>
        </section>
      </nav>
    </section>
  );
});
export default PortMobileMenu;

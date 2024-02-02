import { Dispatch, ForwardedRef, MutableRefObject, SetStateAction, forwardRef } from 'react';
import { projectDatabase } from '../../assets/data/project-database/projectDatabase';

type PropDrillType = {
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
  portMobileMenu: boolean;
  setPortMobileMenu: Dispatch<SetStateAction<boolean>>;
  portMobileMenuRef: MutableRefObject<HTMLElement | null>;
  usePortMobileMenu: () => void;
};

const PortMobileMenu = forwardRef<HTMLElement, PropDrillType>(
  (
    { setProjectSlideIndex, featureState, setFeatureState, portMobileMenu, setPortMobileMenu, portMobileMenuRef, usePortMobileMenu }: PropDrillType,
    ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <section className='portMobileMenu' ref={ref} data-status={'false'}>
        <nav className='portMobileMenu__nav'>
          <section className='portMobileMenu__nav__header'>
            <div className='portMobileMenu__nav__header__block'>
              <button>Justin Barker</button>
            </div>
            <div className='portMobileMenu__nav__header__block'>
              <button className='carouselNav__section__mobile--menu' aria-label='Open link menu' onClick={() => usePortMobileMenu()}>
                Menu
                <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
                  <path fill='#ffffff' d='m12 15l-5-5h10z'></path>
                </svg>
              </button>
            </div>
          </section>
          <ul className='portMobileMenu__nav__projects' aria-labelledby='project-demo-navigation'>
            {projectDatabase.map((_, index) => (
              <li className='portMobileMenu__nav__ul__li' key={_.key + index}>
                <button
                  className='portMobileMenu__nav__ul__li--button'
                  id='project-demo-navigation'
                  aria-label={`View ${_.key} Project`}
                  onClick={() => setProjectSlideIndex(index)}>
                  0{index + 1}. {_.key}
                </button>
              </li>
            ))}
          </ul>
          <section className='portMobileMenu__nav__footer'>
            <div className='portMobileMenu__nav__footer__block'>
              <span>Front End Developer</span>
            </div>
            <div className='portMobileMenu__nav__footer__block'>
              <button
                id='contact-and-external-links'
                aria-label='Contact Form'
                onClick={() =>
                  featureState.contactFormActive
                    ? setFeatureState({ ...featureState, contactFormActive: false })
                    : setFeatureState({ ...featureState, contactFormActive: true })
                }>
                Contact
              </button>
            </div>
          </section>
        </nav>
      </section>
    );
  }
);
export default PortMobileMenu;

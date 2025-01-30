import { useEffect, useRef } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Link } from 'react-router';
import { projectData } from '../../../data/projectData';

//Prop drill from Portfolio page
type PropDrillType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
  portMobileMenu: boolean;
  setPortMobileMenu: Dispatch<SetStateAction<boolean>>;
  portMobileMenuRef: MutableRefObject<HTMLElement | null>;
  usePortMobileMenu: () => void;
};

/** Component */
const PortHeader = ({
  projectSlideIndex,
  setProjectSlideIndex,
  featureState,
  setFeatureState,
  portMobileMenu,
  setPortMobileMenu,
  portMobileMenuRef,
  usePortMobileMenu,
}: PropDrillType) => {
  //** Arrow position references & logic */
  const unorderedListRef = useRef<HTMLUListElement | null>(null);
  const unorderedListChildrenArray = Array.from(unorderedListRef.current?.children ?? []) as HTMLLIElement[];
  const unorderedListChildrenPositionArray = unorderedListChildrenArray.map((child) => child.offsetLeft);

  // Set arrow position of project navigation by number
  useEffect(() => {
    if (unorderedListRef.current) unorderedListRef.current.style.setProperty('--afterPsuedoSelector', `${unorderedListChildrenPositionArray[projectSlideIndex]}px`);
  }, [projectSlideIndex]);

  /** Component Transition Out */
  const initialRender = useRef<boolean>(true);
  const carouselNavSectionLeft = useRef<HTMLDivElement>(null);
  const carouselNavSectionRight = useRef<HTMLDivElement>(null);
  const carouselNavSectionRightNav = useRef<HTMLDivElement>(null);
  const carouselNavSectionRightAnimator = useRef<HTMLDivElement>(null);

  const getCarouselNavHeaderChildrenArray = (): HTMLElement[] => {
    if ((carouselNavSectionLeft.current, carouselNavSectionRight.current, carouselNavSectionRightNav.current, carouselNavSectionRightAnimator.current)) {
      return [
        ...carouselNavSectionLeft.current!.children,
        ...carouselNavSectionRight.current!.children,
        ...carouselNavSectionRightNav.current!.children,
        ...carouselNavSectionRightAnimator.current!.children,
      ] as HTMLElement[];
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (initialRender.current) initialRender.current = false;

    if (Object.values(featureState).some((value) => value === true)) {
      // Grid transition out animator
      getCarouselNavHeaderChildrenArray().forEach((element: HTMLElement) => element.setAttribute('data-status', 'carouselNavHeaderOut'));
    } else if (!initialRender) {
      // Grid transition in animator
      setTimeout(() => getCarouselNavHeaderChildrenArray().forEach((element: HTMLElement) => element.setAttribute('data-status', 'carouselNavHeaderIn')), 1000);
    } else {
      // Mount animator
      getCarouselNavHeaderChildrenArray().forEach((element: HTMLElement) => element.setAttribute('data-status', 'carouselNavHeaderIn'));
    }
  }, [featureState]);

  /** Section Right 'Menu' animator */
  const animatorLineArray = useRef<HTMLSpanElement[]>([]);
  const animatorLine = (reference: HTMLSpanElement) => {
    if (reference && !animatorLineArray.current.includes(reference)) animatorLineArray.current.push(reference);
  };

  return (
    <header className='carouselNav'>
      <section className='carouselNav__section'>
        <div className='carouselNav__section__left' ref={carouselNavSectionLeft}>
          <h2>Navigate projects by number</h2>
          <span className='carouselNav__section__left--location'>{`Project 0${projectSlideIndex + 1}.`}</span>
          <nav className='carouselNav__section__left__projectNav' aria-labelledby='project-navigation'>
            <ul ref={unorderedListRef}>
              {projectData.map((_, index) => (
                <li key={_.key + index}>
                  <button
                    className={`${projectSlideIndex === index ? 'projectNavButtonActive' : ''}`}
                    id='project-navigation'
                    aria-label={`View ${_.key} Project`}
                    onClick={() => setProjectSlideIndex(index)}>
                    0{index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section
        className='carouselNav__section'
        onPointerOver={() => {
          carouselNavSectionRightNav.current?.setAttribute('data-status', 'hovered');
          animatorLineArray.current?.forEach((line: HTMLSpanElement) => line.setAttribute('data-status', 'active'));
        }}
        onPointerLeave={() => {
          carouselNavSectionRightNav.current?.removeAttribute('data-status');
          animatorLineArray.current?.forEach((line: HTMLSpanElement) => line.removeAttribute('data-status'));
        }}>
        <div className='carouselNav__section__right' ref={carouselNavSectionRight}>
          <h2>External Links</h2>
          <nav className='carouselNav__section__right__nav carouselNavHeaderRight' aria-labelledby='external-links' ref={carouselNavSectionRightNav}>
            <Link to='https://github.com/jbarkergit' id='external-links' target='_blank' aria-label='Visit GitHub Profile'>
              GitHub
            </Link>
            <Link to='https://leetcode.com/u/jbarkerlc/' id='external-links' target='_blank' aria-label='Visit LeetCode Profile'>
              LeetCode
            </Link>
            <button
              aria-label='Contact'
              onClick={() =>
                featureState.contactFormActive
                  ? setFeatureState({ ...featureState, contactFormActive: false })
                  : setFeatureState({ ...featureState, contactFormActive: true })
              }>
              Contact
            </button>
          </nav>
          <div className='carouselNav__section__right__animator' ref={carouselNavSectionRightAnimator}>
            <span className='carouselNav__section__right__animator--line' ref={animatorLine} />
            <span className='carouselNav__section__right__animator--line' ref={animatorLine} />
            <span className='carouselNav__section__right__animator--line' ref={animatorLine} />
          </div>
        </div>
      </section>

      <section className='carouselNav__section'>
        <div className='carouselNav__section__mobile'>
          <button className='carouselNav__section__mobile--menu' aria-label='Open link menu' onClick={() => usePortMobileMenu()}>
            Menu
            <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
              <path fill='#ffffff' d='m12 15l-5-5h10z'></path>
            </svg>
          </button>
        </div>
      </section>
    </header>
  );
};

export default PortHeader;

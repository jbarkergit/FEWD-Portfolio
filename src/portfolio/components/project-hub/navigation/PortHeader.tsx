import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectDatabase } from '../../../assets/data/project-database/projectDatabase';

//Prop drill from Portfolio page
type PortHeaderType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

/** Component */
const PortHeader = ({ projectSlideIndex, setProjectSlideIndex, featureState, setFeatureState }: PortHeaderType): JSX.Element => {
  //** Arrow position references & logic */
  const unorderedListRef = useRef<HTMLUListElement | null>(null);
  const unorderedListChildrenArray = Array.from(unorderedListRef.current?.children ?? []) as HTMLLIElement[];
  const unorderedListChildrenPositionArray = unorderedListChildrenArray.map((child) => child.offsetLeft);

  // Set arrow position of project navigation by number
  useEffect(() => {
    if (unorderedListRef.current) unorderedListRef.current.style.setProperty('--afterPsuedoSelector', `${unorderedListChildrenPositionArray[projectSlideIndex]}px`);
  }, [projectSlideIndex]);

  /** Component Transition Out */
  const portHeaderSections = useRef<HTMLElement[]>([]);
  const portHeaderSection = (reference: HTMLElement) => {
    if (reference && !portHeaderSections.current.includes(reference)) portHeaderSections.current?.push(reference);
  };

  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (initialRender.current) initialRender.current = false;

    if (Object.values(featureState).some((value) => value === true) && portHeaderSections.current) {
      // Grid transition out animator
      portHeaderSections.current?.forEach((section: HTMLElement) => section.setAttribute('data-status', 'fadeOut'));
    } else if (!initialRender) {
      // Grid transition in animator
      setTimeout(() => portHeaderSections.current?.forEach((section: HTMLElement) => section.setAttribute('data-status', 'fadeIn')), 1000);
    } else {
      // Mount animator
      portHeaderSections.current?.forEach((section: HTMLElement) => section.setAttribute('data-status', 'fadeIn'));
    }
  }, [featureState]);

  /** carouselNavHeaderRight */
  const carouselNavHeaderRight = useRef<HTMLDivElement>(null);

  const animatorLineArray = useRef<HTMLSpanElement[]>([]);
  const animatorLine = (reference: HTMLSpanElement) => {
    if (reference && !animatorLineArray.current.includes(reference)) animatorLineArray.current.push(reference);
  };

  return (
    <header className='carouselNav'>
      <section className='carouselNav__section' ref={portHeaderSection}>
        <div className='carouselNav__section__left'>
          <h2>Navigate projects by number</h2>
          <span className='carouselNav__section__left--location'>{`Project 0${projectSlideIndex + 1}.`}</span>
          <nav className='carouselNav__section__left__projectNav' aria-labelledby='project-navigation'>
            <ul ref={unorderedListRef}>
              {projectDatabase.map((_, index) => (
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
        ref={portHeaderSection}
        onPointerOver={() => {
          carouselNavHeaderRight.current?.setAttribute('data-status', 'hovered');
          animatorLineArray.current?.forEach((line: HTMLSpanElement) => line.setAttribute('data-status', 'active'));
        }}
        onPointerLeave={() => {
          carouselNavHeaderRight.current?.removeAttribute('data-status');
          animatorLineArray.current?.forEach((line: HTMLSpanElement) => line.removeAttribute('data-status'));
        }}>
        <div className='carouselNav__section__right carouselNavHeaderRight' ref={carouselNavHeaderRight}>
          <h2>Contact Form and GitHub Links</h2>
          <nav className='carouselNav__section__right__nav' aria-labelledby='contact-and-external-links'>
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
            <Link to='https://github.com/jbarkergit' id='contact-and-external-links' target='_blank' aria-label='Visit GitHub Profile'>
              GitHub
            </Link>
          </nav>
          <div className='carouselNav__section__right__animator'>
            <span className='carouselNav__section__right__animator--line' ref={animatorLine} />
            <span className='carouselNav__section__right__animator--line' ref={animatorLine} />
            <span className='carouselNav__section__right__animator--line' ref={animatorLine} />
          </div>
        </div>
      </section>
    </header>
  );
};

export default PortHeader;

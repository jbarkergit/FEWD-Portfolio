import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { myProjects } from '../../../data/projects/myProjects';

//Prop drill from Portfolio page
type PortHeaderType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

/** Map project length array */
const projectIndexArray: number[] = [];

myProjects.forEach((_, index) => {
  if (!projectIndexArray.includes(index)) projectIndexArray.push(index);
});

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
  //** */

  //** Menu hover reveal effect array of references */
  const menuButtons = useRef<HTMLDivElement>(null);
  const lines = useRef<HTMLDivElement[]>([]);
  const line = (reference: HTMLDivElement) => {
    if (lines.current && !lines.current.includes(reference)) lines.current.push(reference);
  };

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

  return (
    <header className='portHeader'>
      <section className='portHeader__index' ref={portHeaderSection}>
        <h2>Navigate projects by number</h2>
        <div className='portHeader__index__location'>{`Project 0${projectSlideIndex + 1}.`}</div>
        <nav className='portHeader__index__slideNav'>
          <ul ref={unorderedListRef}>
            {projectIndexArray.map((_, index) => (
              <li key={index}>
                <button
                  className={`${projectSlideIndex === index ? 'projectNavButtonActive' : ''}`}
                  aria-label={`View Project ${projectSlideIndex + 1}`}
                  onClick={() => setProjectSlideIndex(index)}>
                  0{index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section
        className='portHeader__menu'
        onPointerOver={() => {
          lines.current.forEach((line) => {
            if (line) line.setAttribute('data-transform', 'true');
          });
          if (menuButtons.current) menuButtons.current.setAttribute('data-transform', 'true');
        }}
        onPointerLeave={() => {
          lines.current.forEach((line) => {
            if (line) line.setAttribute('data-transform', 'false');
          });
          if (menuButtons.current) menuButtons.current.setAttribute('data-transform', 'false');
        }}
        ref={portHeaderSection}>
        <h2>Contact Form and GitHub Links</h2>
        <div className='portHeader__menu__buttons' ref={menuButtons} data-transform={'false'}>
          <button
            aria-label='Contact Form'
            onClick={() =>
              featureState.contactFormActive
                ? setFeatureState({ ...featureState, contactFormActive: false })
                : setFeatureState({ ...featureState, contactFormActive: true })
            }>
            Contact
          </button>
          <Link to='https://github.com/jbarkergit' target='_blank' aria-label='GitHub'>
            GitHub
          </Link>
        </div>
        <div className='portHeader__menu__navbar'>
          <div className='portHeader__menu__navbar--line' data-transform={'false'} ref={line} />
          <div className='portHeader__menu__navbar--line' data-transform={'false'} ref={line} />
          <div className='portHeader__menu__navbar--line' data-transform={'false'} ref={line} />
        </div>
      </section>
    </header>
  );
};

export default PortHeader;

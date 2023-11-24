import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { myProjects } from '../../../assets/projects-data/myProjects';

//Prop drill from Portfolio page
type PortHeaderType = {
  mountAnimation: boolean;
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  techStackActive: boolean;
  setTechStackActive: Dispatch<SetStateAction<boolean>>;
  contactFormActive: boolean;
  setContactFormActive: Dispatch<SetStateAction<boolean>>;
};

/** Map project length array */
const projectIndexArray: number[] = [];

myProjects.forEach((_, index) => {
  if (!projectIndexArray.includes(index)) projectIndexArray.push(index);
});

/** Component */
const PortHeader = ({
  mountAnimation,
  projectSlideIndex,
  setProjectSlideIndex,
  contactFormActive,
  setContactFormActive,
  techStackActive,
  setTechStackActive,
}: PortHeaderType): JSX.Element => {
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

  return (
    <header className={`portHeader ${mountAnimation ? 'data-mount-animation-fade-in' : ''}`}>
      <section className='portHeader__index'>
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
        }}>
        <div className='portHeader__menu__buttons' ref={menuButtons} data-transform={'false'}>
          <button aria-label='Contact Form' onClick={() => (contactFormActive ? setContactFormActive(false) : setContactFormActive(true))}>
            Contact
          </button>
          <button aria-label='Tech Stack' onClick={() => (techStackActive ? setTechStackActive(false) : setTechStackActive(true))}>
            Tech Stack
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

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

//Prop drill from Portfolio page
type PortHeaderType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  setContactFormActive: Dispatch<SetStateAction<boolean>>;
  setTechStackActive: Dispatch<SetStateAction<boolean>>;
};

const PortHeader = ({ projectSlideIndex, setProjectSlideIndex, setContactFormActive, setTechStackActive }: PortHeaderType): JSX.Element => {
  //** Arrow position references & logic */
  const unorderedListRef = useRef<HTMLUListElement | null>(null);
  const unorderedListChildrenArray = Array.from(unorderedListRef.current?.children ?? []) as HTMLLIElement[];
  const unorderedListChildrenPositionArray = unorderedListChildrenArray.map((child) => child.offsetLeft);

  // Set arrow position of project navigation by number
  useEffect(() => {
    if (unorderedListRef.current) unorderedListRef.current.style.setProperty('--afterPsuedoSelector', `${unorderedListChildrenPositionArray[projectSlideIndex]}px`);
  }, [projectSlideIndex]);
  //** */

  //** Menu hover reveal effect */
  const portHeaderMenu = useRef<HTMLElement>(null);
  const [portHeaderMenuHovered, setPortHeaderMenuHovered] = useState<boolean>(false);

  useEffect(() => {
    const onPointerOver = (e: PointerEvent) => setPortHeaderMenuHovered(true);
    const onPointerLeave = () => setPortHeaderMenuHovered(false);

    if (portHeaderMenu.current) {
      portHeaderMenu.current.addEventListener('pointerover', onPointerOver);
      portHeaderMenu.current.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      if (portHeaderMenu.current) {
        portHeaderMenu.current.removeEventListener('pointerover', onPointerOver);
        portHeaderMenu.current.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, []);

  return (
    <header className='portHeader'>
      <section className='portHeader__index'>
        <div className='portHeader__index__location'>{`Project 0${projectSlideIndex + 1}.`}</div>
        <nav className='portHeader__index__slideNav'>
          <ul ref={unorderedListRef}>
            {Array.from({ length: 2 }).map((_, index) => (
              <li key={index}>
                <button className='buttonNav' aria-label={`View Project ${projectSlideIndex + 1}`} onClick={() => setProjectSlideIndex(index)}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 24 24'>
                    <path
                      fill='#ffffff'
                      fillRule='evenodd'
                      d='M3.464 20.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535ZM9.5 8.75A3.25 3.25 0 1 0 12.75 12a.75.75 0 0 1 1.5 0A4.75 4.75 0 1 1 9.5 7.25a.75.75 0 0 1 0 1.5ZM17.75 12a3.25 3.25 0 0 1-3.25 3.25a.75.75 0 0 0 0 1.5A4.75 4.75 0 1 0 9.75 12a.75.75 0 0 0 1.5 0a3.25 3.25 0 0 1 6.5 0Z'
                      clipRule='evenodd'></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className='portHeader__menu' ref={portHeaderMenu}>
        <div className='portHeader__menu__buttons' data-status={portHeaderMenuHovered ? 'active' : 'disabled'}>
          <button aria-label='Contact Form' onClick={() => setContactFormActive(true)}>
            Contact
          </button>
          <button aria-label='Tech Stack' onClick={() => setTechStackActive(true)}>
            Tech Stack
          </button>
          <Link to='https://github.com/jbarkergit' target='_blank'>
            GitHub
          </Link>
        </div>
        <div className='portHeader__menu__navbar' data-status={portHeaderMenuHovered ? 'disabled' : 'active'}>
          <div className='portHeader__menu__navbar--line' />
          <div className='portHeader__menu__navbar--line' />
          <div className='portHeader__menu__navbar--line' />
        </div>
      </section>
    </header>
  );
};

export default PortHeader;

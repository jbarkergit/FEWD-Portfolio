import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type PortHeaderType = {
  stateIndex: number;
  setStateIndex: Dispatch<SetStateAction<number>>;
  contactForm: boolean;
  setContactForm: Dispatch<SetStateAction<boolean>>;
};

const PortHeader = ({ stateIndex, setStateIndex, contactForm, setContactForm }: PortHeaderType): JSX.Element => {
  const unorderedListRef = useRef<HTMLUListElement | null>(null);
  const unorderedListChildrenArray = Array.from(unorderedListRef.current?.children ?? []) as HTMLLIElement[];
  const unorderedListChildrenPositionArray = unorderedListChildrenArray.map((child) => child.offsetLeft);

  //Set arrow position of project navigation by number
  useEffect(() => unorderedListRef.current?.style.setProperty('--afterPsuedoSelector', `${unorderedListChildrenPositionArray[stateIndex]}px`), [stateIndex]);

  return (
    <header className="portHeader">
      <section className="portHeader__index">
        <div className="portHeader__index__location">{`Project 0${stateIndex + 1}.`}</div>
        <nav className="portHeader__index__slideNav">
          <ul ref={unorderedListRef}>
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <button className="buttonNav" onClick={() => setStateIndex(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                    <path
                      fill="#ffffff"
                      fillRule="evenodd"
                      d="M3.464 20.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535ZM9.5 8.75A3.25 3.25 0 1 0 12.75 12a.75.75 0 0 1 1.5 0A4.75 4.75 0 1 1 9.5 7.25a.75.75 0 0 1 0 1.5ZM17.75 12a3.25 3.25 0 0 1-3.25 3.25a.75.75 0 0 0 0 1.5A4.75 4.75 0 1 0 9.75 12a.75.75 0 0 0 1.5 0a3.25 3.25 0 0 1 6.5 0Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="portHeader__menu">
        <button onClick={() => setContactForm(contactForm ? false : true)}>Contact</button>
        <Link to="https://github.com/jbarkergit" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 256 256">
            <path
              fill="#ffffff"
              d="M212.62 75.17A63.7 63.7 0 0 0 206.39 26A12 12 0 0 0 196 20a63.71 63.71 0 0 0-50 24h-20a63.71 63.71 0 0 0-50-24a12 12 0 0 0-10.39 6a63.7 63.7 0 0 0-6.23 49.17A61.5 61.5 0 0 0 52 104v8a60.1 60.1 0 0 0 45.76 58.28A43.66 43.66 0 0 0 92 192v4H76a20 20 0 0 1-20-20a44.05 44.05 0 0 0-44-44a12 12 0 0 0 0 24a20 20 0 0 1 20 20a44.05 44.05 0 0 0 44 44h16v12a12 12 0 0 0 24 0v-40a20 20 0 0 1 40 0v40a12 12 0 0 0 24 0v-40a43.66 43.66 0 0 0-5.76-21.72A60.1 60.1 0 0 0 220 112v-8a61.5 61.5 0 0 0-7.38-28.83ZM196 112a36 36 0 0 1-36 36h-48a36 36 0 0 1-36-36v-8a37.87 37.87 0 0 1 6.13-20.12a11.65 11.65 0 0 0 1.58-11.49a39.9 39.9 0 0 1-.4-27.72a39.87 39.87 0 0 1 26.41 17.8a12 12 0 0 0 10.1 5.53h32.35a12 12 0 0 0 10.11-5.53a39.84 39.84 0 0 1 26.41-17.8a39.9 39.9 0 0 1-.4 27.72a12 12 0 0 0 1.61 11.53A37.85 37.85 0 0 1 196 104Z"
            />
          </svg>
        </Link>
      </section>
    </header>
  );
};

export default PortHeader;

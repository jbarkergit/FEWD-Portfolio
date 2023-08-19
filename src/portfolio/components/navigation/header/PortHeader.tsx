import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

type PortHeaderType = {
  closestIndex: number;
  setClosestIndex: Dispatch<SetStateAction<number>>;
  showDialog: boolean | null;
  setShowDialog: Dispatch<SetStateAction<boolean | null>>;
  dialogTab: string | null;
  setDialogTab: Dispatch<SetStateAction<string | null>>;
};

const PortHeader = ({ closestIndex, setClosestIndex, showDialog, setShowDialog, dialogTab, setDialogTab }: PortHeaderType): JSX.Element => {
  const unorderedListRef = useRef<HTMLUListElement | null>(null);
  const unorderedListChildrenArray = Array.from(unorderedListRef.current?.children ?? []) as HTMLLIElement[];
  const unorderedListChildrenPositionArray = unorderedListChildrenArray.map((child) => child.offsetLeft);

  const aboutDialogButtonRef = useRef<HTMLButtonElement>(null);
  const contactDialogButtonRef = useRef<HTMLButtonElement>(null);

  //Set arrow position of project navigation by number
  useEffect(() => unorderedListRef.current?.style.setProperty('--afterPsuedoSelector', `${unorderedListChildrenPositionArray[closestIndex]}px`), [closestIndex]);

  return (
    <header className="portHeader">
      <section className="portHeader__index">
        <div className="portHeader__index__location">{`Project 0${closestIndex + 1}.`}</div>
        <nav className="portHeader__index__slideNav">
          <ul ref={unorderedListRef}>
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <button onClick={() => setClosestIndex(index)}>
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
        <button
          ref={aboutDialogButtonRef}
          onClick={() => {
            setShowDialog(true);
            setDialogTab('about');
          }}
        >
          Technologies
        </button>
        <button
          ref={contactDialogButtonRef}
          onClick={() => {
            setShowDialog(true);
            setDialogTab('contact');
          }}
        >
          Contact
        </button>
      </section>
    </header>
  );
};

export default PortHeader;

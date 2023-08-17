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
  useEffect(() => unorderedListRef.current?.style.setProperty('--afterPsuedoSelector', `${3 + unorderedListChildrenPositionArray[closestIndex]}px`), [closestIndex]);

  return (
    <header className="portHeader">
      <section className="portHeader__index">
        <div className="portHeader__index__indicator">
          <div className="portHeader__index__indicator__location">{`Project 0${closestIndex + 1}.`}</div>
          <nav className="portHeader__index__indicator__slideNav">
            <ul ref={unorderedListRef}>
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} role="button" onClick={() => setClosestIndex(index)}>
                  0{index + 1}.
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="portHeader__slideSelection__slideIndex"></div>
      </section>
      <section className="portHeader__menu">
        <nav className="portHeader__menu__nav">
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
        </nav>
      </section>
    </header>
  );
};

export default PortHeader;

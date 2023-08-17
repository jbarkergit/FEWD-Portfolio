import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CurrentTimeCDT from './CurrentTimeCDT';

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
        <div className="portHeader__index__location">{`Project 0${closestIndex + 1}.`}</div>
        <nav className="portHeader__index__slideNav">
          <ul ref={unorderedListRef}>
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <button onClick={() => setClosestIndex(index)}>0{index + 1}.</button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <CurrentTimeCDT />
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
        <Link to="https://github.com/jbarkergit" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
            <path
              fill="#ffffff"
              fillRule="evenodd"
              d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.536 10.536 0 0 1 12 6.32a10.49 10.49 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
            ></path>
          </svg>
        </Link>
      </section>
    </header>
  );
};

export default PortHeader;

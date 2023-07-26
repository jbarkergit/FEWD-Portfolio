import { useEffect, useRef } from 'react';
import { useDialogContext } from '../../context/DialogContext';
import { useClosestIndexContext } from '../../context/ClosestIndex';

const DialogButtons = (): JSX.Element => {
  const aboutDialogButtonRef = useRef<HTMLButtonElement>(null),
    contactDialogButtonRef = useRef<HTMLButtonElement>(null);

  //@ts-ignore
  const { setShowDialog } = useDialogContext();

  useEffect(() => {
    function setDialogAboutTrue() {
      setShowDialog(true);
    }
    function setDialogContactTrue() {
      setShowDialog(true);
    }

    aboutDialogButtonRef.current?.addEventListener('pointerup', setDialogAboutTrue);
    contactDialogButtonRef.current?.addEventListener('pointerup', setDialogContactTrue);

    return () => {
      aboutDialogButtonRef.current?.removeEventListener('pointerup', setDialogAboutTrue);
      contactDialogButtonRef.current?.removeEventListener('pointerup', setDialogContactTrue);
    };
  }, []);

  return (
    <>
      <button ref={aboutDialogButtonRef}>
        <span>About</span>
      </button>
      <button ref={contactDialogButtonRef}>
        <span>Contact</span>
      </button>
    </>
  );
};

const PortHeader = (): JSX.Element => {
  // @ts-ignore:
  const { closestIndexContext, setClosestIndexContext } = useClosestIndexContext();
  const unorderedListRef = useRef<HTMLUListElement | null>(null);
  const unorderedListChildrenArray = Array.from(unorderedListRef.current?.children ?? []) as HTMLLIElement[],
    unorderedListChildrenPositionArray = unorderedListChildrenArray.map((child) => child.offsetLeft);

  useEffect(() => {
    if (unorderedListRef.current)
      unorderedListRef.current.style.setProperty('--afterPsuedoSelector', `${3 + unorderedListChildrenPositionArray[closestIndexContext]}px`);
  }, [unorderedListRef.current, closestIndexContext]);

  useEffect(() => {
    const setCurrentSlide = (e: PointerEvent) => {
      if (unorderedListChildrenArray && e.target instanceof HTMLLIElement) {
        const index = unorderedListChildrenArray.findIndex((child) => child === e.target);
        setClosestIndexContext(index);
      }
    };
    unorderedListRef.current?.addEventListener('pointerup', setCurrentSlide);
    return () => unorderedListRef.current?.removeEventListener('pointerup', setCurrentSlide);
  }, [unorderedListChildrenArray, unorderedListRef.current]);

  return (
    <header className="portHeader">
      <section className="portHeader__index">
        <div className="portHeader__index__indicator">
          <div className="portHeader__index__indicator__location">{`Project 0${closestIndexContext + 1}.`}</div>
          <nav className="portHeader__index__indicator__slideNav">
            <ul ref={unorderedListRef}>
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} role="button">
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
          <DialogButtons />
        </nav>
      </section>
    </header>
  );
};

export default PortHeader;

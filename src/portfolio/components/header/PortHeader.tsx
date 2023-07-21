import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStateContext } from '../../../shared/context/StateContextProvider';

const PortHeader = () => {
  // @ts-ignore:
  const { closestIndexContext, setClosestIndexContext } = useStateContext();
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
          <div className="portHeader__index__indicator__location">{`Project 0${closestIndexContext + 1}`}</div>
          <nav className="portHeader__index__indicator__slideNav">
            <ul ref={unorderedListRef}>
              {Array.from({ length: 3 }).map((_, index) => (
                <li key={index} role="button">
                  0{index + 1}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="portHeader__slideSelection__slideIndex"></div>
      </section>
      <section className="portHeader__menu">
        <nav className="portHeader__menu__nav">
          <button>
            <span>About</span>
          </button>
          <button>
            <span>Contact</span>
          </button>
        </nav>
      </section>
    </header>
  );
};

export default PortHeader;

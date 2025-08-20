import { useRef, useEffect } from 'react';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDCollections from '../collections/FDCollections';
import FDMovie from '../cineInfo/FDCineInfo';
import FDPerson from '~/film-database/features/catalog/modals/person/FDPerson';

const FDModal = () => {
  // Context
  const { isModal, setIsModal } = useCatalogProvider();

  // References
  const modal = useRef<HTMLDivElement>(null);

  /**
   * @function handleExteriorClicks
   * @returns void
   * Sets modal state (in context) to false when the user isn't directly interacting with modal
   */
  const handleExteriorClicks = (event: PointerEvent): void => {
    if (!modal.current?.contains(event.target as Node)) {
      setIsModal(undefined);
    }
  };

  /**
   * @function useEffect
   * @returns (() => void
   * Mount event listeners for @handleExteriorClicks
   */
  useEffect(() => {
    if (isModal) document.addEventListener('pointerdown', handleExteriorClicks);
    return () => document.removeEventListener('pointerdown', handleExteriorClicks);
  }, [isModal]);

  /** JSX */
  if (isModal)
    return (
      <div className='fdModal'>
        <div
          className='fdModal__container'
          ref={modal}>
          {isModal === 'movie' && <FDMovie />}
          {isModal === 'collections' && <FDCollections />}
          {isModal === 'person' && <FDPerson />}
        </div>
      </div>
    );
};

export default FDModal;

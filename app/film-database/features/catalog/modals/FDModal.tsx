import { useRef, useEffect } from 'react';
import { useModal } from '~/film-database/context/ModalContext';
import FDCineInfo from '~/film-database/features/catalog/modals/cineInfo/FDCineInfo';
import FDCollections from '~/film-database/features/catalog/modals/collections/FDCollections';
import FDPerson from '~/film-database/features/catalog/modals/person/FDPerson';

const FDModal = () => {
  // Context
  const { isModal, setIsModal } = useModal();

  // References
  const modal = useRef<HTMLDivElement>(null);

  /** Sets modal state (in context) to false when the user isn't directly interacting with modal */
  const handleExteriorClicks = (event: PointerEvent): void => {
    if (!modal.current?.contains(event.target as Node)) {
      setIsModal(undefined);
    }
  };

  /** Mount event listeners for @handleExteriorClicks */
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
          role='dialog'
          ref={modal}>
          {isModal === 'movie' && <FDCineInfo />}
          {isModal === 'collections' && <FDCollections />}
          {isModal === 'person' && <FDPerson />}
        </div>
      </div>
    );
};

export default FDModal;

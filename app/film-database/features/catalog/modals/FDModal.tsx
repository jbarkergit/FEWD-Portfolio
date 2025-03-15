import { useRef, useEffect } from 'react';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDMovieModal from './content/FDMovieModal';
import FDMovieList from './content/FDMovieList';

const FDModal = () => {
  // Context
  const { isMovieModal, setIsMovieModal, isListModal, setIsListModal } = useCatalogProvider();

  // References
  const modal = useRef<HTMLDivElement>(null);

  /**
   * @function handleExteriorClicks
   * @returns void
   * Sets modal state (in context) to false when the user isn't directly interacting with modal
   */
  const handleExteriorClicks = (event: PointerEvent): void => {
    if (!modal.current?.contains(event.target as Node)) {
      if (isMovieModal) setIsMovieModal(false);
      if (isListModal) setIsListModal(false);
    }
  };

  /**
   * @function mountListeners
   * @returns (() => void
   * Mount event listeners for @handleExteriorClicks
   */
  const mountListeners = (): (() => void) => {
    const unmount = () => document.body.removeEventListener('pointerup', handleExteriorClicks);

    if (modal.current) {
      if (isMovieModal || isListModal) {
        document.body.addEventListener('pointerup', handleExteriorClicks);
      }
    } else unmount();

    return () => unmount();
  };

  useEffect(() => mountListeners(), [isMovieModal, isListModal]);

  /** JSX */
  if (isMovieModal || isListModal)
    return (
      <div className='fdModal'>
        <div className='fdModal__container' ref={modal}>
          {isMovieModal && <FDMovieModal />}
          {isListModal && <FDMovieList />}
        </div>
      </div>
    );
};

export default FDModal;

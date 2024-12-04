import { useState } from 'react';

export const useMovieModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const mount = (): void => setIsOpen(true);
  const unmount = (): void => setIsOpen(false);
  return { isOpen, mount, unmount };
};

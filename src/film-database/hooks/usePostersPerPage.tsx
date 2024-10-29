import { useEffect, useState } from 'react';

export const usePostersPerPage = (): number | undefined => {
  const root = document.body.querySelector('.filmDatabase') as HTMLElement;
  if (!root) return;

  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(undefined);

  const getItemsPerPage = (): void => {
    const styles: CSSStyleDeclaration = getComputedStyle(root);
    const value: number = parseInt(styles.getPropertyValue('--fd-carousel-items-per-page').trim());
    setItemsPerPage(value);
  };

  useEffect(() => {
    // Init fetch
    getItemsPerPage();
    // Detect changes to data-attribute
    const observer: MutationObserver = new MutationObserver(() => getItemsPerPage());
    observer.observe(root, { attributes: true });
    // Cleanup
    return () => observer.disconnect();
  }, [root]);

  return itemsPerPage;
};

export default usePostersPerPage;

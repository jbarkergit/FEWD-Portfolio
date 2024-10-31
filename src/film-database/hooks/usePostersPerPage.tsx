import { useEffect, useState } from 'react';

export const usePostersPerPage = (): number => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);

  useEffect(() => {
    const root = document.body.querySelector('.filmDatabase') as HTMLElement;

    const getItemsPerPage = (): void => {
      const styles: CSSStyleDeclaration = getComputedStyle(root);
      const value: number = parseInt(styles.getPropertyValue('--fd-carousel-items-per-page'));
      setItemsPerPage(value);
    };

    // Init fetch
    getItemsPerPage();

    // Observe changes to data-attribute
    const observer = new MutationObserver(() => getItemsPerPage());
    observer.observe(root, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return itemsPerPage;
};

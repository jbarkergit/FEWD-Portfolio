import { useLocation } from 'react-router-dom';

export const useBreadCrumbs = (): JSX.Element => {
  const locationPath = useLocation().pathname;
  const regexPattern = /(ecommerce|\W)+/g;
  const breadCrumbs = locationPath.replace(regexPattern, ' ');

  return (
    <div className='productCatalogTopper__panel breadCrumbs' aria-label={breadCrumbs} tabIndex={0}>
      <h1>{breadCrumbs}</h1>
    </div>
  );
};

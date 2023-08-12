import { useLocation } from 'react-router-dom';

const useBreadCrumbs = (): JSX.Element => {
  const locationPath = useLocation().pathname;
  const regexPattern = /(ecommerce|\W)+/g;
  const breadCrumbs = locationPath.replace(regexPattern, ' ');

  return (
    <div className="productFilters__panel breadCrumbs" aria-label={breadCrumbs}>
      <h1>{breadCrumbs}</h1>
    </div>
  );
};

export default useBreadCrumbs;

import { useLocation } from 'react-router-dom';

const useBreadCrumbs = (): JSX.Element => {
  const locationPath = useLocation().pathname;
  const regexPattern = /(ecommerce|\W)+/g;
  const breadCrumbs = locationPath.replace(regexPattern, ' ');

  return (
    <div className="breadcrumb" aria-label={breadCrumbs}>
      <h1>{breadCrumbs}</h1>
    </div>
  );
};

export default useBreadCrumbs;

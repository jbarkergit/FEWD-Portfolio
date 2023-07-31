import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const useBreadcrumbs = (): JSX.Element => {
  const location = useLocation();

  const currentLocation = useMemo(() => {
    const breadcrumbs = location.pathname
      .replace(/[^\w\s]/gi, ' ')
      .split('ecommerce')
      .filter((breadcrumb) => breadcrumb !== '');
    return breadcrumbs.join('');
  }, [location.pathname]);

  return (
    <div className="breadcrumb" key={uuidv4()} aria-label={currentLocation}>
      <h1>{currentLocation}</h1>
    </div>
  );
};

export default useBreadcrumbs;

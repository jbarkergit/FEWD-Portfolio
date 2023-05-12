import { useLocation } from 'react-router-dom';

export default function useBreadcrumbs() {
  const location = useLocation();
  let currentLocation: string = '';
  const breadcrumbs = location.pathname
    .replace(/-/g, ' ')
    .split('/ecommerce/')
    .filter((breadcrumb) => breadcrumb !== '')
    .map((breadcrumb) => {
      currentLocation += `/${breadcrumb}`;
    });
  return (
    <div className="breadcrumb" key={breadcrumbs} aria-label={currentLocation}>
      <h1>{currentLocation}</h1>
    </div>
  );
}

import { useLocation, useParams } from 'react-router-dom';
import HomeSkeleton from '../../ecommerce/skeletons/pages/HomeSkeleton';
import ProductCatalogSkeleton from '../../ecommerce/skeletons/pages/ProductCatalogSkeleton';
import ProductDetailPageSkeleton from '../../ecommerce/skeletons/pages/ProductDetailPageSkeleton';

function SuspensePathHandler() {
  const location = useLocation();
  const { paramId } = useParams();

  switch (location.pathname) {
    case '/ecommerce':
      return <HomeSkeleton />;
    case '/ecommerce/products':
    case '/ecommerce/headphones':
    case '/ecommerce/amps-dacs':
    case '/ecommerce/microphones':
    case '/ecommerce/interfaces':
      return <ProductCatalogSkeleton />;
    case `/product/${paramId}`:
      return <ProductDetailPageSkeleton />;
    default:
      return <HomeSkeleton />;
  }
}

export default SuspensePathHandler;

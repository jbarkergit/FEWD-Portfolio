import { useLocation, useParams } from 'react-router-dom';
import HomeSkeleton from '../../../ecommerce/pages/skeletons/HomeSkeleton';
import ProductCatalogSkeleton from '../../../ecommerce/pages/skeletons/ProductCatalogSkeleton';
import ProductDetailPageSkeleton from '../../../ecommerce/pages/skeletons/ProductDetailPageSkeleton';
import DefaultSkeleton from '../default-skeleton/DefaultSkeleton';

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
      return <DefaultSkeleton />;
  }
}

export default SuspensePathHandler;

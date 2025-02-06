import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router';
import type { ProductType } from '~/ecommerce/context/CartContext';
import { ecommerceProducts } from '~/ecommerce/data/ecommerceProducts';
import ProductProp from './ProductProp';

// Custom hook to filter products based on the location (category or other attributes)
const useProductFilter = (location: string): ProductType[] => {
  const filteredData = ecommerceProducts.reduce((result: ProductType[], product: ProductType) => {
    if (product.category) {
      switch (location) {
        case 'products':
          return ecommerceProducts.sort((a, b) => a.company.localeCompare(b.company));

        case 'headphones':
        case 'microphones':
        case 'interfaces':
          if (Array.isArray(product.category) && product.category.includes(location)) result.push(product);
          else if (typeof product.category === 'string' && product.category.includes(location)) result.push(product);
          break;

        case 'amps-dacs':
          if (Array.isArray(product.category) && (product.category as string[]).some((cat) => ['amps', 'dacs', 'amps-dacs'].includes(cat))) result.push(product);
          else if (typeof product.category === 'string' && ['amps', 'dacs', 'amps-dacs'].includes(product.category)) result.push(product);
          break;

        default:
          if (product.company?.includes(location)) result.push(product);
          else if (product.wearStyle?.includes(location)) result.push(product);
          else if (product.polarPattern?.includes(location)) result.push(product);
          else console.error('Failure at ProductProvider: Location unavailable or property are unavailable in default case.');
      }
    }
    return result;
  }, []);

  return filteredData.sort((a, b) => a.company.localeCompare(b.company));
};

/** Product Display */
const ProductProvider = () => {
  // State for paginated products
  const [paginatedProducts, setPaginatedProducts] = useState<ProductType[][]>([]);
  // State for currently visible products
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  // Ref to track the index of the currently visible product set
  const visibleArrayIndex = useRef(0);
  // Ref for the last product, used for IntersectionObserver
  const lastProductRef = useRef<HTMLLIElement>(null);
  // Get current location for filtering
  const location = useLocation().pathname.split('/').pop() || 'products';

  /**
   * Paginate filtered data: chunks of 7 products
   * Fetch filtered and paginated products when location changes
   */

  const getPaginatedProducts = (filteredData: ProductType[]) => {
    const newPaginatedData = [];
    for (let i = 0; i < filteredData.length; i += 7) newPaginatedData.push(filteredData.slice(i, i + 7));
    setPaginatedProducts(newPaginatedData);
  };

  useEffect(() => {
    const filteredData = useProductFilter(location);
    getPaginatedProducts(filteredData);
  }, [location]);

  // Set the first set of paginated products when the paginated products state is updated
  useEffect(() => {
    if (paginatedProducts.length) {
      setVisibleProducts(paginatedProducts[0]);
      // Reset the index when paginated products change
      visibleArrayIndex.current = 0;
    }
  }, [paginatedProducts]);

  /** Observer: Handle new products when the last product comes into view */
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    // If the last product is in view and more products are available
    if (entry.isIntersecting && visibleArrayIndex.current + 1 < paginatedProducts.length) {
      visibleArrayIndex.current += 1;
      // Append new products to visibleProducts
      setVisibleProducts((prev) => [...prev, ...paginatedProducts[visibleArrayIndex.current]]);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { root: null, threshold: 0.1 });
    if (lastProductRef.current) observer.observe(lastProductRef.current);
    return () => {
      if (lastProductRef.current) observer.unobserve(lastProductRef.current!);
    };
  }, [visibleProducts]);

  /** JSX */
  return (
    <ul className='productGrid'>
      {visibleProducts.map((product, index) => (
        <li key={product.sku} ref={index === visibleProducts.length - 1 ? lastProductRef : null}>
          <ProductProp product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductProvider;

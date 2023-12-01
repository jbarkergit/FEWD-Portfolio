import { useEffect, useRef, useState } from 'react';
import { usePaginatedProductSets } from '../../../hooks/usePaginatedProductSets';
import { ProductType } from '../../../types/ProductType';
import ProductProp from './ProductProp';

/* usePaginatedSets utilizes useProductFilter, which uses window.location.pathname to render appropriate product arrays */

const ProductProvider = (): JSX.Element => {
  //** Filtered & paginated products */
  const paginatedProducts: ProductType[][] = usePaginatedProductSets();

  //** Holds current visible products to be mapped */
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([
    { sku: '', stock: 0, company: '', unit: '', price: 0 },
    { sku: '', stock: 0, company: '', unit: '', price: 0 },
    { sku: '', stock: 0, company: '', unit: '', price: 0 },
    { sku: '', stock: 0, company: '', unit: '', price: 0 },
    { sku: '', stock: 0, company: '', unit: '', price: 0 },
    { sku: '', stock: 0, company: '', unit: '', price: 0 },
    { sku: '', stock: 0, company: '', unit: '', price: 0 },
  ]);

  //** Tracks current visible array index */
  const [visibleArrayIndex, setVisibleArrayIndex] = useState<number>(0);

  //** Last visible product reference for observer */
  const lastProductRef = useRef<HTMLLIElement>(null);

  /** Remove temporary values when paginatedProducts is available */
  useEffect(() => setVisibleProducts([]), [paginatedProducts]);

  //** Push first set of products to dom when paginatedProducts is updated and during navigation to prevent non-renders on initial page load */
  useEffect(() => {
    if (paginatedProducts.length > 0) {
      setVisibleProducts(paginatedProducts[0]);

      //** Forgetting to reset the index will result in partial product array rendering */
      setVisibleArrayIndex(0);
    }
  }, [window.location.pathname, paginatedProducts]);

  //** Push new array of products when the last visible product is in the viewport */
  const intersectionCallback = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      // Ensure the dom does not receive empty objects to map into the FC (dangerous)
      if (visibleArrayIndex + 1 < paginatedProducts.length) {
        // Push new array of products
        setVisibleProducts((prevVisibleProducts) => [...prevVisibleProducts, ...paginatedProducts[visibleArrayIndex + 1]]);
        // Keep track of current index
        setVisibleArrayIndex((prevVisibleArrayIndex) => prevVisibleArrayIndex + 1);
      }
    }
  };

  //** Observer logic */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersectionCallback(entry);
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    if (lastProductRef.current) observer.observe(lastProductRef.current);

    return () => {
      if (lastProductRef.current) observer.unobserve(lastProductRef.current);
      observer.disconnect();
    };
  }, [visibleProducts]);

  return (
    <ul className='productGrid'>
      {visibleProducts.map((product: ProductType, index: number) => {
        if (visibleProducts && index === visibleProducts.length - 1) {
          return (
            <li key={product.unit} ref={lastProductRef}>
              <ProductProp product={product} />
            </li>
          );
        } else {
          return (
            <li key={product.unit}>
              <ProductProp product={product} />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default ProductProvider;

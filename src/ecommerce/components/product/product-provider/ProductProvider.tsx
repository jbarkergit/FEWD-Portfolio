import { useEffect, useRef, useState } from 'react';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import usePaginatedSets from '../../../hooks/usePaginatedSets';
import { ProductType } from '../../../types/ProductType';
import ProductProp from './ProductProp';

/* 
usePaginatedSets utilizes useProductFilter, which uses useState[categoryFilter] Context Hook to render appropriate product arrays
categoryFilter is a single global state, which is used by useProductFilter -> rerenders ProductProvider Prop upon navigation
*/

const ProductProvider = (): JSX.Element => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();

  //** Filtered & paginated products */
  const paginatedProducts: ProductType[][] = usePaginatedSets();

  //** Holds current visible products to be mapped */
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  //** Tracks current visible array index */
  const [visibleArrayIndex, setVisibleArrayIndex] = useState<number>(0);
  //** Reference variable to keep track of last visible product */
  const lastProductRef = useRef<HTMLLIElement>(null);

  //** Push first set of products to dom on navigation */
  useEffect(() => {
    if (paginatedProducts.length > 0) setVisibleProducts(paginatedProducts[0]);
  }, [categoryFilter, paginatedProducts]);

  //** Push new array of products when the last visible product is in the viewport */
  const pushProducts = () => {
    if (visibleArrayIndex + 1 < paginatedProducts.length) {
      setVisibleProducts((prevVisibleProducts) => [...prevVisibleProducts, ...paginatedProducts[visibleArrayIndex + 1]]);
      setVisibleArrayIndex((prevVisibleArrayIndex) => prevVisibleArrayIndex + 1);
    }
  };

  //** Envoke pushProducts when the last visible product is in the viewport */
  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) pushProducts();
  };

  //** Observer logic */
  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, {
      root: null, //Defining null allows the observer to use the dom viewport
      threshold: 1.0, //Physical element amount visible in viewport (1.0 = 10%)
    });

    if (lastProductRef.current) observer.observe(lastProductRef.current);

    return () => {
      if (lastProductRef.current) observer.unobserve(lastProductRef.current);
      observer.disconnect(); //Prevent memory leaks
    };
  }, [visibleProducts]);

  return (
    <ul className='productGrid'>
      {visibleProducts.map((product: ProductType, index: number) => {
        if (index === visibleProducts.length - 1) {
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

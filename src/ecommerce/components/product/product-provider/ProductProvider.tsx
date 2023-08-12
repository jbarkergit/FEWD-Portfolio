import { useState, useEffect, useRef, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import usePaginatedSets from '../../../hooks/usePaginatedSets';
import { ProductType } from '../../../types/ProductType';
import { setArrayType } from '../../../types/SetArrayType';
import ProductProp from './ProductProp';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const ProductProvider = () => {
  // @ts-ignore
  const { categoryFilter } = useCategoryFilterContext();
  const [fetchedSets, setFetchedSets] = useState<setArrayType[]>([]); //Initialize empty array to hold paginated product sets
  const paginatedSets: setArrayType[] = usePaginatedSets(); //Localize custom hook import to bypass warnings
  //usePaginatedSets utilizes useProductFilter, which uses useState[categoryFilter] Context Hook to render appropriate product arrays
  //categoryFilter is a single global state, which is used by useProductFilter -> rerenders ProductProvider Prop upon navigation

  useEffect(() => setFetchedSets([paginatedSets[0]]), [categoryFilter]); //Resets rendered product sets on page reload via paginatedSets(usePaginatedSets Hook)
  const lastProductRef = useRef<HTMLLIElement>(null); //useRef to be placed on last rendered element (for the observer)

  //Retrieves data and pushes to dom on scroll: If the last product is in the viewport, spread 9 new products into fetchedSets state
  useEffect(() => {
    if (lastProductRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && fetchedSets) setFetchedSets((prevSets) => [...prevSets, paginatedSets[fetchedSets.length]]);
        },
        {
          threshold: 0.5,
        }
      );
      observer.observe(lastProductRef.current);
      return () => {
        if (lastProductRef.current) observer.unobserve(lastProductRef.current);
      };
    }
  }, [lastProductRef, fetchedSets]);

  return (
    <ul className="productGrid">
      {fetchedSets.length > 0 &&
        fetchedSets.map((productSet: setArrayType) =>
          productSet?.products.map((product: ProductType, index: number) => {
            return (
              <Fragment key={uuidv4()}>
                <ProductProp product={product} />
                {fetchedSets.length - 1 === index && fetchedSets[fetchedSets.length - 1] === productSet && <li key="lastProduct" ref={lastProductRef} />}
              </Fragment>
            );
          })
        )}
    </ul>
  );
};
export default ProductProvider;

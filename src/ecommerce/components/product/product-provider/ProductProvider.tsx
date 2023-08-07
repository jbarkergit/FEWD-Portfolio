import { useState, useEffect, useRef, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import usePaginatedSets from '../../../hooks/usePaginatedSets';
import { ProductType } from '../../../types/ProductType';
import { setArrayType } from '../../../types/SetArrayType';
import ProductProp from './ProductProp';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const ProductProvider = () => {
  const [fetchedSets, setFetchedSets] = useState<setArrayType[]>([]); //holds currently fetched sets for query
  const paginatedSets: setArrayType[] = usePaginatedSets(); //localize custom hook import to bypass react warnings
  //usePaginatedSets utilizes useProductFilter, which uses useState[categoryFilter] Context Hook to render appropriate product arrays

  // @ts-ignore //categoryFilter is a single global state, which is used by useProductFilter -> rerenders ProductProvider Prop upon navigation
  const { categoryFilter } = useCategoryFilterContext();

  useEffect(() => setFetchedSets([paginatedSets[0]]), [categoryFilter]); //sets first product set from paginatedSets(usePaginatedSets Hook) as initState on nav
  const lastProductRef = useRef<HTMLLIElement>(null); //ref for last rendered element for observer

  useEffect(() => {
    if (lastProductRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          //if last product is in the viewport, spread new set into fetchedSets state
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

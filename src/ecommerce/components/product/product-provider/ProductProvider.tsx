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
  //usePaginatedSets utilizes useProductFilter, which uses useState[categoryFilter] Context Hook to render appropriate product arrays
  //categoryFilter is a single global state, which is used by useProductFilter -> rerenders ProductProvider Prop upon navigation

  const paginatedSets: setArrayType[] = usePaginatedSets(); //Filtered & paginated products -> localize hook to prevent warnings
  // console.log(paginatedSets);
  const [renderedSets, setRenderedSets] = useState<setArrayType[]>([paginatedSets[0]]); //Initialize empty array to hold paginated product sets
  useEffect(() => setRenderedSets([paginatedSets[0]]), [categoryFilter]); //Resets renderedSets state to hold the first set of products

  const lastProductRef = useRef<HTMLLIElement>(null); //useRef to be placed on last rendered element (for the observer)

  //Retrieves data and pushes to fetchedSetsStorage when last product is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      //Check if the last product element is visible
      if (entries[0].isIntersecting) setRenderedSets((renderedProductSets) => [...renderedProductSets, paginatedSets[renderedSets.length]]);
    });

    if (lastProductRef.current) observer.observe(lastProductRef.current);
    return () => {
      if (lastProductRef.current) observer.unobserve(lastProductRef.current);
      observer.disconnect;
    };
  }, []);

  return (
    <ul className="productGrid">
      {renderedSets.length > 0
        ? renderedSets.map((productSet: setArrayType) =>
            productSet?.products.map((product: ProductType, index: number) => {
              return (
                <Fragment key={uuidv4()}>
                  <ProductProp product={product} />
                  {renderedSets.length - 1 === index && renderedSets[renderedSets.length - 1] === productSet && <li key="lastProduct" ref={lastProductRef} />}
                </Fragment>
              );
            })
          )
        : null}
    </ul>
  );
};
export default ProductProvider;

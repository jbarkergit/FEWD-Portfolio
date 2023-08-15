import { useRef } from 'react';
import usePaginatedSets from '../../../hooks/usePaginatedSets';
import { ProductType } from '../../../types/ProductType';
import ProductProp from './ProductProp';

//usePaginatedSets utilizes useProductFilter, which uses useState[categoryFilter] Context Hook to render appropriate product arrays
//categoryFilter is a single global state, which is used by useProductFilter -> rerenders ProductProvider Prop upon navigation

const ProductProvider = (): JSX.Element => {
  const paginatedProducts: ProductType[][] = usePaginatedSets(); //Filtered & paginated products -> localize hook to prevent warnings

  //useRef to be placed on last rendered element for the observer
  const lastProductRef = useRef<HTMLLIElement>(null);

  // Retrieves data and pushes to fetchedSetsStorage when last product is in the viewport
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     //Check if the last product element is visible
  //     if (entries[0].isIntersecting) setRenderedSets((renderedProductSets) => [...renderedProductSets, paginatedSets[renderedSets.length]]);
  //   });

  //   if (lastProductRef.current) observer.observe(lastProductRef.current);
  //   return () => {
  //     if (lastProductRef.current) observer.unobserve(lastProductRef.current);
  //     observer.disconnect;
  //   };
  // }, []);

  return (
    <ul className="productGrid">
      {paginatedProducts.map((paginatedArrays: ProductType[]) => {
        return paginatedArrays.map((product: ProductType) => {
          return <ProductProp key={product.unit} product={product} />;
        });
      })}
    </ul>
  );
};

export default ProductProvider;

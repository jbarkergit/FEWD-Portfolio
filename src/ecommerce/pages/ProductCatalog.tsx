import { useEffect, useRef, useState } from 'react';
import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductFilters from '../components/features/product-filters/ProductFilters';
import ProductProvider from '../components/product/product-provider/ProductProvider';
import { setArrayType } from '../types/SetArrayType';
import usePaginatedSets from '../hooks/usePaginatedSets';
import { ProductType } from '../types/ProductType';
import useCart from '../hooks/useCart';
import { StateProvider, useCategoryFilterContext } from '../context/CategoryFilterContext';

const ProductCat = (): JSX.Element => {
  const [fetchedSets, setFetchedSets] = useState<setArrayType[]>([]); //holds currently fetched sets for query
  const paginatedSets: setArrayType[] = usePaginatedSets(); //localize custom hook import to bypass react warnings
  //usePaginatedSets utilizes useProductFilter, which uses useState[categoryFilter] Context Hook to render appropriate product arrays

  //@ts-ignore //categoryFilter is a single global state, which is used by useProductFilter -> rerenders ProductProvider Prop upon navigation
  const { categoryFilter } = useCategoryFilterContext();

  useEffect(() => setFetchedSets([paginatedSets[0]]), [categoryFilter]); //sets first product set from paginatedSets(usePaginatedSets Hook) as initState
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
    <div data-theme="eco-light-mode">
      <Header />
      <section className="browseProduct">
        <ProductFilters />
        <main>
          <ul className="productGrid">
            {fetchedSets.length > 0 &&
              fetchedSets.map((productSet: setArrayType) =>
                productSet?.products.map((product: ProductType, index: number) => {
                  return (
                    <>
                      <ProductProvider key={product.sku} product={product} />
                      {fetchedSets.length - 1 === index && fetchedSets[fetchedSets.length - 1] === productSet && <li ref={lastProductRef} />}
                    </>
                  );
                })
              )}
          </ul>
        </main>
      </section>
      <Footer />
    </div>
  );
};

const ProductCatalog = () => {
  return (
    <StateProvider>
      <ProductCat />
    </StateProvider>
  );
};
export default ProductCatalog;

// const { dispatch, REDUCER_ACTIONS } = useCart();
//dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} //props

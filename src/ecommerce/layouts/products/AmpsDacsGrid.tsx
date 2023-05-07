import ProductProps from '../../components/props/products/ProductCartProps';
import ProductFilters from '../../features/ProductFilters';
import AllProducts from '../../data/AllProducts';

const AmpsDacsGrid = () => {
  return (
    <main>
      <ProductFilters pageLoc="Headphones" />
      <ul className="productGrid justifyCenter">
        {AllProducts.map((product) => {
          return (
            <ProductProps
              id={product.id}
              productImg={product.productImg}
              productCompany={product.productCompany}
              productName={product.productName}
              productDescription={product.productDescription}
              productPrice={product.productPrice}
            />
          );
        })}
      </ul>
    </main>
  );
};
export default AmpsDacsGrid;

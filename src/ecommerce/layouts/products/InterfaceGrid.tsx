import ProductProps from '../../components/props/products/ProductCartProps';
import ProductInterfaces from '../../data/Interfaces';
import ProductFilters from '../../features/ProductFilters';

const InterfaceGrid = () => {
  return (
    <main>
      <ProductFilters pageLoc="Interfaces" />
      <ul className="productGrid justifyCenter">
        {ProductInterfaces.map((product) => {
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
export default InterfaceGrid;

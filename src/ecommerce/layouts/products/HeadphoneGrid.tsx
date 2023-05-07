import ProductProps from '../../components/props/products/ProductCartProps';
import Beyerdynamic from '../../data/Beyerdynamic';
import ProductFilters from '../../features/ProductFilters';

const HeadphoneGrid = () => {
  return (
    <main>
      <ProductFilters pageLoc="Headphones" />
      <ul className="productGrid justifyCenter">
        {Beyerdynamic.map((product) => {
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
export default HeadphoneGrid;

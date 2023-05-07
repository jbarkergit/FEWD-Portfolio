import ProductProps from '../../components/props/products/ProductCartProps';
import Microphones from '../../data/Microphones';
import ProductFilters from '../../features/ProductFilters';

const MicrophoneGrid = () => {
  return (
    <main>
      <ProductFilters pageLoc="Microphones" />
      <ul className="productGrid justifyCenter">
        {Microphones.map((product) => {
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
export default MicrophoneGrid;

import { v4 as uuidv4 } from 'uuid';
import useCart from '../../../hooks/useCart';
import { CartProductType } from '../../../context/CartContext';
import { ProductDatabase } from '../../../assets/production-data/product-db/ProductDatabase';

const CartProducts = (): JSX.Element[] => {
  const { dispatch, REDUCER_ACTIONS, shoppingCart } = useCart();

  return shoppingCart.map((product: CartProductType) => {
    const shoppingCartProductSku: string = product.sku;
    const shoppingCartProductQuantity: number = product.quantity;
    const databaseProductStock: number | undefined = ProductDatabase.find((product) => product.sku === shoppingCartProductSku)?.stock;
    const maximumStockMet = shoppingCartProductQuantity === databaseProductStock;
    return (
      <li key={uuidv4()}>
        <article className="ecoModal__lineItem">
          <picture>{product.images ? <img src={product.images![0]} alt={product.unit} loading="lazy" decoding="async" fetchpriority="low" /> : null}</picture>
          <div className="ecoModal__lineItem__information">
            <hgroup>
              <h2>{`${product.company} ${product.unit} ${Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}`}</h2>
              <h3>
                {product.company} {product.unit}
              </h3>
              <h4>{Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
            </hgroup>
            <div className="ecoModal__lineItem__information__quantity">
              <button onClick={() => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: product })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24">
                  <path fill="#ffffff" d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0Z"></path>
                </svg>
              </button>
              <span>{maximumStockMet ? product.quantity + '/' + product.quantity : product.quantity}</span>
              <button onClick={() => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, quantity: 1 } })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 24 24">
                  <path
                    fill="#ffffff"
                    d="m12.37 8.165l6.43 6.63c.401.414.158 1.205-.37 1.205H5.57c-.528 0-.771-.79-.37-1.205l6.43-6.63a.499.499 0 0 1 .74 0Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </article>
      </li>
    );
  });
};

export default CartProducts;

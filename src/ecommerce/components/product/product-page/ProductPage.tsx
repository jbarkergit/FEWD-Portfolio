import { useParams } from 'react-router-dom';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';
import { ProductType } from '../../../types/ProductType';
import { ReducerAction, ReducerActionType } from '../../../context/CartContext';
import MoreLikeThis from '../product-recommenders/MoreLikeThis';

type addToCartType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const ProductPage = ({ product, dispatch, REDUCER_ACTIONS }: addToCartType): JSX.Element => {
  const { paramId } = useParams() as { paramId: string };
  const findProduct = ProductDatabase.find((product: ProductType) => product.sku === paramId)!;

  const addToCart = () => {
    const payload = { ...product, stock: 1 };
    dispatch({ type: REDUCER_ACTIONS.ADD, payload });
  };

  return (
    <div className="skuPage">
      <main className="skuPage__grid">
        <div className="skuPage__grid__display">
          <picture>
            <img
              src={findProduct.images![0]}
              alt={findProduct.company + findProduct.unit}
              loading="lazy"
              role="presentation"
              decoding="async"
              fetchpriority="high"
            />
          </picture>
          <div className="skuPage__grid__display__nav">
            <span>Previous</span>
            <span>Next</span>
          </div>
        </div>
        <article className="skuPage__grid__details">
          <hgroup>
            <h1>
              {findProduct.company} {findProduct.unit}
            </h1>
            <h2>{findProduct.company}</h2>
            <h3>{findProduct.unit}</h3>
          </hgroup>
          <p>{findProduct.description}</p>
          <button onClick={addToCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
              <path
                fill="hsl(0, 0%, 20%)"
                d="M2.237 2.288a.75.75 0 1 0-.474 1.423l.265.089c.676.225 1.124.376 1.453.529c.312.145.447.262.533.382c.087.12.155.284.194.626c.041.361.042.833.042 1.546v2.672c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.982 2.26c.601.602 1.36.86 2.26.981c.866.117 1.969.117 3.336.117H18a.75.75 0 0 0 0-1.5h-7c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.235-.235-.4-.551-.506-1.091h10.12c.959 0 1.438 0 1.814-.248c.376-.248.565-.688.943-1.57l.428-1c.81-1.89 1.215-2.834.77-3.508C19.533 6 18.506 6 16.45 6H5.745a8.996 8.996 0 0 0-.047-.833c-.055-.485-.176-.93-.467-1.333c-.291-.404-.675-.66-1.117-.865c-.417-.194-.946-.37-1.572-.58l-.305-.1ZM7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Zm9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3Z"
              ></path>
            </svg>
            {Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(findProduct.price)}
          </button>
        </article>
        <aside className="skuPage__grid__imgSelection">
          {findProduct.images!.map((image) => (
            <picture key={image}>
              <img src={image} alt={findProduct.company + findProduct.unit} role="presentation" decoding="async" fetchpriority="high" />
            </picture>
          ))}
        </aside>
      </main>
      <div className="skuPage__recommendations">
        <MoreLikeThis findProduct={findProduct} />
      </div>
    </div>
  );
};

export default ProductPage;

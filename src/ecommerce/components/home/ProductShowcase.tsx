import { ProductType } from '../../context/exports/types';
import { ProductDatabase } from '../../assets/production-data/ProductDatabase';

const ProductShowcase = () => {
  return (
    <section className="productShowcase">
      {ProductDatabase.filter((product) => product.productshowcase === true).map((ProductData: ProductType) => (
        <article className="productShowcase__product" key={ProductData.unit}>
          <picture className="productShowcase__product__image">
            <img src={ProductData.images![0]} alt={`${ProductData.company} ${ProductData.unit}`} loading="lazy" decoding="async" fetchpriority="low"></img>
          </picture>
          <div className="productShowcase__product__overlay">
            <span className="productShowcase__product__overlay--quarter">{ProductData.unit}</span>
            <span className="productShowcase__product__overlay--quarter">NEW!</span>
            <span className="productShowcase__product__overlay--quarter">
              .<br />
              By
              <br />
              {ProductData.company}
            </span>
            <span className="productShowcase__product__overlay--quarter">
              <i className="fa-solid fa-slash"></i>
            </span>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ProductShowcase;

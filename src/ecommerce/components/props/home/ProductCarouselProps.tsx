type ProductCarouselPropsTypes = { src: string; productName: string; productCompany: string; productPrice: string };

function ProductCarouselProps({ src, productName, productCompany, productPrice }: ProductCarouselPropsTypes) {
  return (
    <article className="productCarousel__product card">
      <picture className="productCarousel__product__image">
        <img src={src} loading="lazy" alt={`${productCompany} ${productName}`}></img>
      </picture>
      <div className="productCarousel__product__overlay">
        <span className="productCarousel__product__overlay--quarter">{productName}</span>
        <span className="productCarousel__product__overlay--quarter">{productPrice}</span>
        <span className="productCarousel__product__overlay--quarter">
          .<br />
          By
          <br />
          {productCompany}
        </span>
        <span className="productCarousel__product__overlay--quarter">
          <i className="fa-solid fa-slash"></i>
        </span>
      </div>
    </article>
  );
}

export default ProductCarouselProps;

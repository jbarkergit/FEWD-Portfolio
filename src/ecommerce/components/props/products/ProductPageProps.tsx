type ProductPagePropTypes = {
  id: string;
  productImg: string;
  productCompany: string;
  productName: string;
  productDescription: string;
  productPrice: number;
};

const ProductPageProps = ({
  id,
  productImg,
  productCompany,
  productName,
  productDescription,
  productPrice,
}: ProductPagePropTypes) => {
  {
    return (
      <div className="productPage flexBox" key={id}>
        <section className="productPhotos flexBox justifyCenter">
          <button>
            <picture data-status="active">
              <img src={productImg} alt={`${productCompany} ${productName} `} />
            </picture>
          </button>
          <button>
            <picture data-status="inactive">
              <img src={productImg} alt={`${productCompany} ${productName} `} />
            </picture>
          </button>
          <button>
            <picture data-status="inactive">
              <img src={productImg} alt={`${productCompany} ${productName} `} />
            </picture>
          </button>
        </section>
        <section className="activeProductPhoto flexBox justifyCenter">
          <picture>
            <img src={productImg} alt={`${productCompany} ${productName} `} />
          </picture>
        </section>
        <main className="productPlate flexBox flexColumn alignUnset">
          <span>
            <h1>
              {productCompany}
              {productName}
            </h1>
          </span>
          <ul>
            <li>
              <h2>About {productName}</h2>
            </li>
            <li>
              <p>{productDescription}</p>
            </li>
            <li className="linebreak" />
            <li>{productPrice}</li>
            <li>ADD TO CART</li>
          </ul>
        </main>
      </div>
    );
  }
};
export default ProductPageProps;

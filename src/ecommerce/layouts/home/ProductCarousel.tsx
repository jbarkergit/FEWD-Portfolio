import ProductCarouselProps from '../../components/props/home/ProductCarouselProps';

const ProductCarousel = () => {
  const cards = document.getElementById('cards');
  if (cards instanceof HTMLElement) {
    cards.onmousemove = (e) => {
      for (const card of document.getElementsByClassName('card')) {
        if (card instanceof HTMLElement) {
          const rect = card.getBoundingClientRect(),
            x: number = e.clientX - rect.left,
            y: number = e.clientY - rect.top;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      }
    };
  }
  return (
    <section className="productCarousel" id="cards">
      <ProductCarouselProps
        src="https://d33p2k2w4zpozf.cloudfront.net/media/catalog/product/b/e/beyerdynamic-dt-1990-pro-perspective_transparent_1.png"
        productName=""
        productCompany=""
        productPrice=""
      />
      <ProductCarouselProps
        src="https://d33p2k2w4zpozf.cloudfront.net/media/catalog/product/b/e/beyerdynamic-dt-1990-pro-perspective_transparent_1.png"
        productName=""
        productCompany=""
        productPrice=""
      />
      <ProductCarouselProps
        src="https://d33p2k2w4zpozf.cloudfront.net/media/catalog/product/b/e/beyerdynamic-dt-1990-pro-perspective_transparent_1.png"
        productName=""
        productCompany=""
        productPrice=""
      />
      <ProductCarouselProps
        src="https://d33p2k2w4zpozf.cloudfront.net/media/catalog/product/b/e/beyerdynamic-dt-1990-pro-perspective_transparent_1.png"
        productName=""
        productCompany=""
        productPrice=""
      />
      <ProductCarouselProps
        src="https://d33p2k2w4zpozf.cloudfront.net/media/catalog/product/b/e/beyerdynamic-dt-1990-pro-perspective_transparent_1.png"
        productName=""
        productCompany=""
        productPrice=""
      />
      <ProductCarouselProps
        src="https://d33p2k2w4zpozf.cloudfront.net/media/catalog/product/b/e/beyerdynamic-dt-1990-pro-perspective_transparent_1.png"
        productName=""
        productCompany=""
        productPrice=""
      />
    </section>
  );
};

export default ProductCarousel;

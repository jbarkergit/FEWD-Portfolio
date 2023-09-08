import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductDatabase } from '../../assets/production-data/product-db/ProductDatabase';
import { ProductType } from '../../types/ProductType';

const ProductHighlight = (): JSX.Element => {
  const revealRefs = useRef<HTMLPictureElement[]>([]);

  const addToRefs = (el: HTMLPictureElement) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useEffect(() => {
    const userPointerOver = (e: PointerEvent): void => {
      const curTarget = e.currentTarget as HTMLPictureElement;
      const asideTarget = curTarget.nextSibling as HTMLElement;
      const videoTarget = asideTarget.children[0] as HTMLVideoElement;
      videoTarget.play();
    };

    const userPointerLeave = (e: PointerEvent): void => {
      const curTarget = e.currentTarget as HTMLPictureElement;
      const asideTarget = curTarget.nextSibling as HTMLElement;
      const videoTarget = asideTarget.children[0] as HTMLVideoElement;
      videoTarget.pause();
      videoTarget.currentTime = 0;
    };

    revealRefs.current?.forEach((ref) => {
      ref.addEventListener('pointerover', userPointerOver);
      ref.addEventListener('pointerleave', userPointerLeave);
    });

    return () => {
      revealRefs.current?.forEach((ref) => {
        ref.removeEventListener('pointerover', userPointerOver);
        ref.removeEventListener('pointerleave', userPointerLeave);
      });
    };
  }, []);

  return (
    <section className="productHighlight">
      <h2 className="productHighlight__heading">
        <span>
          Available <span className="highlight">Now</span>
        </span>
      </h2>
      <ul>
        {ProductDatabase.filter((product: ProductType) => product.productshowcase === true).map((product: ProductType) => (
          <li key={uuidv4()}>
            <Link to={`/ecommerce/product/${product.sku}`} onClick={() => window.scrollTo({ top: 0 })}>
              <article>
                <picture ref={addToRefs}>
                  <img src={product.images![0]} alt={`${product.company} ${product.unit}`} loading="lazy" decoding="async" fetchpriority="low" />
                </picture>
                <aside>
                  <video preload="metadata" playsInline loop muted aria-label="Video of joyful people wearing headphones listening to music">
                    <source src="/src/ecommerce/assets/production-videos/stockfootagesplice.webm" type="video/webm" />
                  </video>
                </aside>
                <hgroup id="productHighlightInfo">
                  <h2>
                    {product.company} {product.unit}
                  </h2>
                  <h3>Starting at {Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h3>
                </hgroup>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductHighlight;

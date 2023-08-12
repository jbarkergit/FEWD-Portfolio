import { MutableRefObject, RefObject, createRef, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductDatabase } from '../../assets/production-data/ProductDatabase';
import { ProductType } from '../../types/ProductType';

const ProductHighlight = (): JSX.Element => {
  const revealRefs = useRef<HTMLPictureElement[]>([]);
  revealRefs.current = [];

  const addToRefs = (el: HTMLPictureElement) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useEffect(() => {
    const userPointerOver = (e: PointerEvent): void => {
      const curTarget = e.currentTarget as HTMLPictureElement,
        asideTarget = curTarget.nextSibling as HTMLElement,
        videoTarget = asideTarget.children[0] as HTMLVideoElement;
      videoTarget.play();
    };

    const userPointerLeave = (e: PointerEvent): void => {
      const curTarget = e.currentTarget as HTMLPictureElement,
        asideTarget = curTarget.nextSibling as HTMLElement,
        videoTarget = asideTarget.children[0] as HTMLVideoElement;
      videoTarget.pause();
      videoTarget.currentTime = 0;
    };

    revealRefs.current?.forEach((ref) => {
      ref.addEventListener('pointerover', userPointerOver);
      ref.addEventListener('pointerleave', userPointerLeave);
    });

    const listenerUnmount = (): void => {
      revealRefs.current?.forEach((ref) => {
        ref.removeEventListener('pointerover', userPointerOver);
        ref.removeEventListener('pointerleave', userPointerLeave);
      });
    };

    return listenerUnmount;
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
                <div id="productHighlightInfo">
                  <h3>{product.company}</h3>
                  <h2>{product.unit}</h2>
                  <h4>Starting at {Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' }).format(product.price)}</h4>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductHighlight;

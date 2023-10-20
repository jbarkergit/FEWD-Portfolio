import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductDatabase } from '../../database/product-db/ProductDatabase';
import { ProductType } from '../../types/ProductType';

const ProductHighlight = (): JSX.Element => {
  //Push all instances of pictureRef references into useRef array
  const pictureArrayRef = useRef<HTMLPictureElement[]>([]);
  const pictureRef = (element: HTMLPictureElement) => (element && !pictureArrayRef.current.includes(element) ? pictureArrayRef.current.push(element) : null);

  //Play video on user pointer hover
  useEffect(() => {
    const userPointerOver = (e: PointerEvent): void => {
      const asideTarget = (e.currentTarget as HTMLPictureElement).parentElement!.nextSibling as HTMLElement;
      (asideTarget.children[0] as HTMLVideoElement).play();
    };

    //Pause and restart video on user pointer leave
    const userPointerLeave = (e: PointerEvent): void => {
      const asideTarget = (e.currentTarget as HTMLPictureElement).parentElement!.nextSibling as HTMLElement;
      const videoTarget = asideTarget.children[0] as HTMLVideoElement;
      videoTarget.pause();
      videoTarget.currentTime = 0;
    };

    //Mount
    pictureArrayRef.current?.forEach((ref) => {
      ref.addEventListener('pointerover', userPointerOver);
      ref.addEventListener('pointerleave', userPointerLeave);
    });

    //Unmount
    return () => {
      pictureArrayRef.current?.forEach((ref) => {
        ref.removeEventListener('pointerover', userPointerOver);
        ref.removeEventListener('pointerleave', userPointerLeave);
      });
    };
  }, []);

  return (
    <section className='productHighlight'>
      <h2 className='productHighlight__heading'>
        <span>
          Available <span className='highlight'>Now</span>
        </span>
      </h2>
      <ul>
        {ProductDatabase.filter((product: ProductType) => product.productshowcase === true).map((product: ProductType) => (
          <li key={uuidv4()}>
            <Link to={`/ecommerce/product/${product.sku}`} onClick={() => window.scrollTo({ top: 0 })}>
              <article>
                <figure>
                  <picture ref={pictureRef}>
                    <img src={product.images!.medium[0]} alt={`${product.company} ${product.unit}`} loading='lazy' decoding='async' fetchpriority='low' />
                    <figcaption>{`${product.company} ${product.unit}`}</figcaption>
                  </picture>
                </figure>
                <aside>
                  <video preload='none' playsInline loop muted aria-label='Video of joyful people wearing headphones listening to music'>
                    <source src='/src/ecommerce/assets/production-videos/stock-footage-splice-374x467.webm' type='video/webm' />
                  </video>
                </aside>
                <hgroup className='productHighlightInfo'>
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

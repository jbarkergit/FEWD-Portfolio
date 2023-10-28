import { Link } from 'react-router-dom';

const Infographic = (): JSX.Element => {
  return (
    <main className='infographic'>
      <section className='infographic__textArea'>
        <article className='infographic__textArea__primary'>
          <strong>
            <span>THE NEW</span>
            <span>HiFi AUDIO</span>
            <span>EXPERIENCE</span>
          </strong>
          <div className='infographic--divider' />
          <h1>
            Unparalleled HiFi audio and <span className='highlight'>superior</span> manufacturing for discerning audiophiles. Crystal-clear sound,{' '}
            <span className='highlight'>premium </span>
            materials, meticulous <span className='highlight'>craftsmanship</span>, and lasting durability.
          </h1>
        </article>
      </section>
      <section className='infographic__focus'>
        <figure>
          <picture>
            <source
              media='(max-width: 1528px)'
              srcSet='/src/ecommerce/assets/production-images/compressed-home-page/infographic/1528x915/img-by-ilias-chebbi-on-unsplash.jpg'
            />
            <img
              src='src/ecommerce/assets/production-images/compressed-home-page/infographic/1528x915/img-by-ilias-chebbi-on-unsplash.jpg'
              alt='Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment'
              decoding='async'
              fetchpriority='high'
            />
            <figcaption>Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment</figcaption>
          </picture>
        </figure>
      </section>
      <section className='infographic__cta'>
        <article className='infographic__cta__news'>
          <div className='infographic__cta__news__beyerdynamic'>
            <p>
              Thanks to our friends over at{' '}
              <Link to='http://localhost:5173/ecommerce/Beyerdynamic'>
                <figure>
                  <picture>
                    <img
                      src='src/ecommerce/assets/production-images/compressed-company-logos/Beyerdynamic.svg'
                      alt='Beyerdynamic'
                      decoding='async'
                      fetchpriority='high'
                    />
                    <figcaption>Beyerdynamic</figcaption>
                  </picture>
                </figure>
              </Link>
              , we're proud to introduce a new line of headphones sporting all new Tesla technology.
            </p>
            <Link to='http://localhost:5173/ecommerce/Beyerdynamic' className='infographic__cta__news--learnMore'>
              Learn more
            </Link>
          </div>
          <figure className='infographic__cta__news__presentation'>
            <picture>
              <source
                media='(max-width: 1528px)'
                srcSet='/src/ecommerce/assets/production-images/compressed-home-page/infographic/1528x915/img-by-ilias-chebbi-on-unsplash.jpg'
              />
              <img
                src='src/ecommerce/assets/production-images/compressed-home-page/infographic/t1.png'
                alt='Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment'
                decoding='async'
                fetchpriority='high'
              />
              <figcaption>Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment</figcaption>
            </picture>
          </figure>
        </article>
      </section>
    </main>
  );
};

export default Infographic;

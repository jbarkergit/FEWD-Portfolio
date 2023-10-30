import { Link } from 'react-router-dom';

const SectionOne = () => {
  return (
    <section className='infographic__textArea'>
      <article>
        <strong tabIndex={0}>
          <span>THE NEW</span>
          <span>HiFi AUDIO</span>
          <span className='highlight'>EXPERIENCE</span>
        </strong>
        <h1 tabIndex={0}>
          Unparalleled HiFi audio and <span className='highlight'>superior</span> manufacturing for discerning audiophiles. Crystal-clear sound,{' '}
          <span className='highlight'>premium </span>
          materials, meticulous <span className='highlight'>craftsmanship</span>, and lasting durability.
        </h1>
        <figure>
          <picture>
            <img
              tabIndex={0}
              src='src/ecommerce/assets/production-images/compressed-home-page/infographic/infographic-1.jpg'
              alt='Man wearing Marshal headphones'
              decoding='async'
              fetchpriority='high'
            />
            <figcaption>Man wearing Marshal headphones</figcaption>
          </picture>
        </figure>
      </article>
    </section>
  );
};

const SectionTwo = () => {
  return (
    <section className='infographic__focus'>
      <h2>Presentation Image</h2>
      <figure>
        <picture>
          {/* <source
            media='(max-width: 1528px)'
            srcSet='/src/ecommerce/assets/production-images/compressed-home-page/infographic/1528x915/img-by-ilias-chebbi-on-unsplash.jpg'
          /> */}
          <img
            src='src/ecommerce/assets/production-images/compressed-home-page/infographic\infographic-2.jpg'
            alt='Man listening to notes he is playing'
            decoding='async'
            fetchpriority='high'
            tabIndex={0}
          />
          <figcaption>Man listening to notes he is playing</figcaption>
        </picture>
      </figure>
    </section>
  );
};

const SectionThree = () => {
  return (
    <section className='infographic__cta'>
      <article>
        <h2 tabIndex={0}>
          <span className='highlight'>NEW </span>DROPS
        </h2>
        <p tabIndex={0}>
          Thanks to our friends over at{' '}
          <Link to='http://localhost:5173/ecommerce/Beyerdynamic' aria-label='View Beyerdynamic Products'>
            Beyerdynamic
          </Link>
          , we're proud to introduce a new line of headphones sporting all new Tesla technology.
        </p>
        <Link to='http://localhost:5173/ecommerce/Beyerdynamic' className='infographic__cta--shopNow' aria-label='Shop Tesla enhanced Headphones'>
          Shop Tesla enhanced Headphones
        </Link>
        <figure>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-home-page/infographic/infographic-3.jpg'
              alt='Man singing on stage'
              decoding='async'
              fetchpriority='high'
              tabIndex={0}
            />
            <figcaption>Man singing on stage</figcaption>
          </picture>
        </figure>
      </article>
    </section>
  );
};

const Infographic = (): JSX.Element => {
  return (
    <main className='infographic'>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </main>
  );
};

export default Infographic;

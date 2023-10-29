import { Link } from 'react-router-dom';

const SectionOne = () => {
  return (
    <section className='infographic__textArea'>
      <article className='infographic__textArea__primary'>
        <strong>
          <span>THE NEW</span>
          <span>HiFi AUDIO</span>
          <span className='highlight'>EXPERIENCE</span>
        </strong>
        <h1>
          Unparalleled HiFi audio and <span className='highlight'>superior</span> manufacturing for discerning audiophiles. Crystal-clear sound,{' '}
          <span className='highlight'>premium </span>
          materials, meticulous <span className='highlight'>craftsmanship</span>, and lasting durability.
        </h1>
      </article>
      <figure className='infographic__textArea__presentation'>
        <picture>
          <img
            src='src/ecommerce/assets/production-images/compressed-home-page/infographic/infographic-1.jpg'
            alt='Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment'
            decoding='async'
            fetchpriority='high'
          />
          <figcaption>Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment</figcaption>
        </picture>
      </figure>
    </section>
  );
};

const SectionTwo = () => {
  return (
    <section className='infographic__focus'>
      <h2></h2>
      <figure>
        <picture>
          {/* <source
            media='(max-width: 1528px)'
            srcSet='/src/ecommerce/assets/production-images/compressed-home-page/infographic/1528x915/img-by-ilias-chebbi-on-unsplash.jpg'
          /> */}
          <img
            src='src/ecommerce/assets/production-images/compressed-home-page/infographic\infographic-2.jpg'
            alt='Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment'
            decoding='async'
            fetchpriority='high'
          />
          <figcaption>Dynamic Audio - Your new go-to source for audiophile grade HiFi audio equipment</figcaption>
        </picture>
      </figure>
    </section>
  );
};

const SectionThree = () => {
  return (
    <section className='infographic__cta'>
      <article className='infographic__cta__news'>
        <div className='infographic__cta__news__beyerdynamic'>
          <h2>
            <span className='highlight'>NEW </span>DROPS
          </h2>
          <p>
            Thanks to our friends over at <Link to='http://localhost:5173/ecommerce/Beyerdynamic'>Beyerdynamic</Link>, we're proud to introduce a new line of
            headphones sporting all new Tesla technology.
          </p>
          <Link to='http://localhost:5173/ecommerce/Beyerdynamic' className='infographic__cta__news--learnMore'>
            Shop Tesla enhanced Headphones
          </Link>
        </div>
        <figure className='infographic__cta__news__presentation'>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-home-page/infographic/infographic-3.jpg'
              alt='Beyerdynamic'
              decoding='async'
              fetchpriority='high'
            />
            <figcaption>Beyerdynamic</figcaption>
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

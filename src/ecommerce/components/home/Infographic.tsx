import { Link } from 'react-router-dom';

const InfographicSectionOne = () => {
  return (
    <section className='infographic__section'>
      <article className='infographic__section__dynamicAudio'>
        <div className='infographic__section__dynamicAudio__textBlock'>
          <strong className='infographic__section__dynamicAudio__textBlock--strong' tabIndex={0}>
            <span>THE NEW </span>
            <span>HiFi AUDIO </span>
            <span className='highlight'>EXPERIENCE</span>
          </strong>
          <h1 tabIndex={0}>
            Unparalleled HiFi audio and <span className='highlight'>superior</span> manufacturing for discerning audiophiles. Crystal-clear sound,{' '}
            <span className='highlight'>premium </span>
            materials, meticulous <span className='highlight'>craftsmanship</span>, and lasting durability.
          </h1>
        </div>
        <figure>
          <picture>
            <img
              tabIndex={0}
              src='src/ecommerce/assets/production-images/compressed-home-page/infographic/infographic-1.jpg'
              alt='Man wearing Marshal headphones'
              decoding='async'
              fetchPriority='high'
            />
            <figcaption>Man wearing Marshal headphones</figcaption>
          </picture>
        </figure>
      </article>
    </section>
  );
};

const InfographicSectionTwo = () => {
  return (
    <section className='infographic__section'>
      <h2>Presentation Image of man listening to notes he is playing</h2>
      <article className='infographic__section__presentation'>
        <figure>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-home-page/infographic\infographic-2.jpg'
              alt='Man listening to notes he is playing'
              decoding='async'
              fetchPriority='high'
              tabIndex={0}
            />
            <figcaption>Man listening to notes he is playing</figcaption>
          </picture>
        </figure>
      </article>
    </section>
  );
};

const InfographicSectionThree = () => {
  return (
    <section className='infographic__section'>
      <article className='infographic__section__news'>
        <div className='infographic__section__news__textBlock'>
          <h2 className='infographic__section__news__textBlock--strong' tabIndex={0}>
            <span>NEW TECH FROM </span>
            <span className='highlight'>Beyerdynamic</span>
          </h2>
          <p tabIndex={0}>Thanks to our friends over at Beyerdynamic, we're proud to introduce a new line of headphones sporting all new Tesla technology.</p>
          <Link to='http://localhost:5173/ecommerce/Beyerdynamic' className='infographic__section__news__textBlock--cta' aria-label='Shop Tesla enhanced Headphones'>
            Shop Tesla enhanced Headphones
          </Link>
        </div>
        <figure>
          <picture>
            <img
              src='src/ecommerce/assets/production-images/compressed-home-page/infographic/infographic-3.jpg'
              alt='Man singing on stage'
              decoding='async'
              fetchPriority='high'
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
      <InfographicSectionOne />
      <InfographicSectionTwo />
      <InfographicSectionThree />
    </main>
  );
};

export default Infographic;

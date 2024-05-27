import { v4 as uuidv4 } from 'uuid';

const FDHero = () => {
  return (
    <section className='fdHero'>
      <div className='fdHero__infographic'>
        <div className='fdHero__infographic__slide' key={uuidv4()}>
          <hgroup className='fdHero__infographic__details'>
            {/* <h2>{values.title}</h2> */}
            {/* <p>{values.overview}</p> */}
            {/* <span>{values.vote_average}</span> */}
          </hgroup>
          <figure>
            <picture>{/* <img src={`https://image.tmdb.org/t/p/original/${values.backdrop_path}`} alt={values.title} /> */}</picture>
            <figcaption></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default FDHero;

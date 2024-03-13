const FDMediaCarousel = () => {
  return (
    <section className='fdCarousel'>
      <h2 className='fdCarousel__heading'>
        <div className='fdCarousel__heading__textBlock'>{useFormatApiKey(mapKey)}</div>
      </h2>
      <div className='fdCarousel__wrapper'>
        {Array.isArray(mapValue) ? (
          mapValue.map((values) => (
            <article className='fdCarousel__wrapper__container'>
              <div className='fdCarousel__wrapper__container__graphic'>
                {/* need to create alt container for lower resolution img processing */}
                {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${value.poster_path}.svg`, alt: value.title as string })}

                <div className='fdCarousel__wrapper__container__graphic__overlay'>
                  <button className='fdCarousel__wrapper__container__graphic__overlay--play' aria-label='Play Trailer'>
                    {useCreatePicture({ svg: <MaterialPlayCircle />, alt: 'Play Trailer' })}
                  </button>
                  <button className='fdCarousel__wrapper__container__graphic__overlay--moreInfo' aria-label='More Information'>
                    {useCreatePicture({ svg: <BootstrapThreeDotsVertical />, alt: 'More Information' })}
                  </button>
                </div>
              </div>

              <hgroup className='fdCarousel__wrapper__container__info'>
                <h2 className='fdCarousel__wrapper__container__info--h2'>{value.title}</h2>
                <h3 className='fdCarousel__wrapper__container__info--h3'>{useFormatDate(value.release_date)}</h3>
              </hgroup>
            </article>
          ))
        ) : (
          <FDCarouselChildLP value={mapValue} key={uuidv4()} />
        )}
        <nav className='fdCarousel__wrapper__navigation'>
          <button className='fdCarousel__wrapper__navigation--button' aria-label='Show Previous'>
            {useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous' })}
          </button>
          <button className='fdCarousel__wrapper__navigation--button' aria-label='Show More'>
            {useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}
          </button>
        </nav>
      </div>
    </section>
  );
};
export default FDMediaCarousel;

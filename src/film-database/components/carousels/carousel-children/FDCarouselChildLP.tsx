// API Types
import { Type_Tmdb_Movie_Obj } from '../../../api/types/TmdbDataTypes';
// Hooks
import { useFormatDate } from '../../../hooks/useFormatDate';
// Component hooks
import useCreatePicture from '../../../hooks/useCreatePicture';
// SVG
import { MaterialPlayCircle } from '../../../icons/MaterialPlayCircle';
import { BootstrapThreeDotsVertical } from '../../../icons/PhDotsThreeVerticalBold';

// types
type Type_PropDrill = {
  mapValue: Type_Tmdb_Movie_Obj;
};

const FDCarouselChildLP = ({ mapValue }: Type_PropDrill) => {
  // Return component only in the event that all of the data is available
  if (mapValue.poster_path && mapValue.title && mapValue.release_date)
    return (
      <article className='fdCarousel__wrapper__container'>
        <div className='fdCarousel__wrapper__container__graphic'>
          {/* need to create alt container for lower resolution img processing */}
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${mapValue.poster_path}.svg`, alt: mapValue.title as string })}

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
          <h2 className='fdCarousel__wrapper__container__info--h2'>{mapValue.title}</h2>
          <h3 className='fdCarousel__wrapper__container__info--h3'>{useFormatDate(mapValue.release_date)}</h3>
        </hgroup>
      </article>
    );
};

export default FDCarouselChildLP;

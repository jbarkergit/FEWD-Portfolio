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
  value: Type_Tmdb_Movie_Obj;
};

const FDCarouselChildLP = ({ value }: Type_PropDrill) => {
  // Return component only in the event that all of the data is available
  if (value.poster_path && value.title && value.release_date)
    return (
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
    );
};

export default FDCarouselChildLP;

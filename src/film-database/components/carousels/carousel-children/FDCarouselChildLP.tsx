import useCreatePicture from '../../../component-creation/useCreatePicture';
import { IcRoundPlayCircle } from '../../../icons/IcRoundPlayCircle';
import { PhDotsThreeVerticalBold } from '../../../icons/PhDotsThreeVerticalBold';

type PropDrillType = {
  data: unknown;
};

const FDCarouselChildLP = ({ data }: PropDrillType) => {
  return (
    <div className='fdCarousel__block'>
      <>{data}</>
      <div className='fdCarousel__block__graphic'>
        <figure className='fdCarousel__block__graphic__image'>
          <picture>
            <img src=''></img>
            <figcaption>Description</figcaption>
          </picture>
        </figure>
        <div className='fdCarousel__block__overlay'>
          <button aria-label='Play Trailer'>
            {useCreatePicture({ svg: <IcRoundPlayCircle />, alt: 'More Information', figcaption: 'More Information Selector' })}
          </button>
          <button aria-label='More Information'>
            {useCreatePicture({ svg: <PhDotsThreeVerticalBold />, alt: 'More Information', figcaption: 'More Information Selector' })}
          </button>
        </div>
      </div>

      <hgroup className='fdCarousel__block__footer'>
        <h2>Movie title</h2>
        <h3>Release Date / Seasons</h3>
      </hgroup>
    </div>
  );
};

export default FDCarouselChildLP;

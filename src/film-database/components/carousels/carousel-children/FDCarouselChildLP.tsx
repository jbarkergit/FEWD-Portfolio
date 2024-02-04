import { useCreateCarouselProps } from '../../../component-creation/useCreateCarousel';
import { IcRoundPlayCircle } from '../../../icons/IcRoundPlayCircle';
import { PhDotsThreeVerticalBold } from '../../../icons/PhDotsThreeVerticalBold';

const FDCarouselChildLP = () => {
  const props = useCreateCarouselProps();

  return (
    <div className='fdCarousel__block'>
      <div className='fdCarousel__block__graphic'>
        <figure className='fdCarousel__block__graphic__image'>
          <picture>
            <img src=''></img>
            <figcaption>Description</figcaption>
          </picture>
        </figure>
        <div className='fdCarousel__block__overlay'>
          <button className='fdCarousel__block__overlay__play'>
            <figure>
              <picture>
                <IcRoundPlayCircle />
                <figcaption>Play Trailer</figcaption>
              </picture>
            </figure>
          </button>
          <button className='fdCarousel__block__overlay__information'>
            <figure>
              <picture>
                <PhDotsThreeVerticalBold />
                <figcaption>More Information</figcaption>
              </picture>
            </figure>
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

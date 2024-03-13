import { MaterialPlayCircle } from '../../../assets/svg-icons/MaterialPlayCircle';
import { BootstrapThreeDotsVertical } from '../../../assets/svg-icons/PhDotsThreeVerticalBold';
import useCreatePicture from '../../../hooks/useCreatePicture';

const FDPosterOverlay = () => {
  return (
    <div className='fdCarousel__wrapper__container__graphic__overlay'>
      <button className='fdCarousel__wrapper__container__graphic__overlay--play' aria-label='Play Trailer'>
        {useCreatePicture({ svg: <MaterialPlayCircle />, alt: 'Play Trailer' })}
      </button>
      <button className='fdCarousel__wrapper__container__graphic__overlay--moreInfo' aria-label='More Information'>
        {useCreatePicture({ svg: <BootstrapThreeDotsVertical />, alt: 'More Information' })}
      </button>
    </div>
  );
};
export default FDPosterOverlay;

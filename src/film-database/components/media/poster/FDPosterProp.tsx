import { Link } from 'react-router-dom';
import { MaterialPlayCircle } from '../../../assets/svg-icons/MaterialPlayCircle';
import { BootstrapThreeDotsVertical } from '../../../assets/svg-icons/PhDotsThreeVerticalBold';
import useCreatePicture from '../../../hooks/useCreatePicture';
import { useFormatDate } from '../../../hooks/useFormatDate';

type Type_PropDrill = {};

const FDPosterProp = ({}: Type_PropDrill) => {
  return (
    <li className='fdFlatGrid__wrapper__li' key={values.id}>
      <article className='fdFlatGrid__wrapper__li__article'>
        <div className='fdFlatGrid__wrapper__li__article__graphic' onClick={() => useVideoPlayer(`${values.id}`)}>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${values.poster_path}.svg`, alt: values.title as string })}

          <div className='fdFlatGrid__wrapper__li__article__graphic__overlay'>
            <button className='fdFlatGrid__wrapper__li__article__graphic__overlay--play' aria-label='Play Trailer' onClick={() => useVideoPlayer(`${values.id}`)}>
              {useCreatePicture({ svg: <MaterialPlayCircle />, alt: 'Play Trailer' })}
            </button>
            <button className='fdFlatGrid__wrapper__li__article__graphic__overlay--moreInfo' aria-label='More Information'>
              {useCreatePicture({ svg: <BootstrapThreeDotsVertical />, alt: 'More Information' })}
            </button>
          </div>
        </div>

        <hgroup className='fdFlatGrid__wrapper__li__article__hgroup'>
          <Link to='' aria-label={values.title}>
            <h2 className='fdFlatGrid__wrapper__li__article__hgroup--h2'>{values.title}</h2>
          </Link>
          <Link to='' aria-label={values.title}>
            <h3 className='fdFlatGrid__wrapper__li__article__hgroup--h3'>{useFormatDate(values.release_date)}</h3>
          </Link>
        </hgroup>
      </article>
    </li>
  );
};
export default FDPosterProp;

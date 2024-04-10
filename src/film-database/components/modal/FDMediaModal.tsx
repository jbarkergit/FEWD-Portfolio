import { Link } from 'react-router-dom';
import useCreatePicture from '../../hooks/component-creation/useCreatePicture';
import { useFormatDate } from '../../hooks/formatters/useFormatDate';
import FDiFrame from '../media/iFrame/FDiFrame';

const FDMediaModal = () => {
  return (
    <section className='FDMediaModal'>
      <section className='FDMediaGrid__wrapper__ul__li__article__poster'>
        <hgroup className='FDMediaGrid__wrapper__ul__li__article__poster__hgroup'>
          <Link to='' aria-label={value.title}>
            <h2 className='FDMediaGrid__wrapper__ul__li__article__poster__hgroup--h2'>{value.title}</h2>
          </Link>
          <Link to='' aria-label={value.title}>
            <h3 className='FDMediaGrid__wrapper__ul__li__article__poster__hgroup--h3'>{useFormatDate(value.release_date)}</h3>
          </Link>
        </hgroup>
        {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${value.poster_path}.svg`, alt: value.title as string })}
      </section>

      <FDiFrame trailerCache={trailerCache} mappedTrailerId={value.id} />
    </section>
  );
};
export default FDMediaModal;

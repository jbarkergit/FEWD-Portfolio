// React
import { Link } from 'react-router-dom';
// Assets
import { MaterialPlayCircle } from '../../../assets/svg-icons/MaterialPlayCircle';
import { BootstrapThreeDotsVertical } from '../../../assets/svg-icons/PhDotsThreeVerticalBold';
// Api Types
import { Type_Tmdb_ApiCallUnion_Obj } from '../../../api/types/TmdbDataTypes';
// Api Hooks
import { useFormatApiKey } from '../../../hooks/useFormatApiKey';
import { useFormatDate } from '../../../hooks/useFormatDate';
import { useTmdbVideos } from '../../../api/hooks/useTmdbVideos';
// Hooks
import useCreatePicture from '../../../hooks/useCreatePicture';

type Type_PropDrill = {
  mapKey: string;
  mapValue: Type_Tmdb_ApiCallUnion_Obj[];
};

const FDFlatGrid = ({ mapKey, mapValue }: Type_PropDrill) => {
  return (
    <section className='fdFlatGrid'>
      <div className='fdFlatGrid__header'>
        <h2 className='fdFlatGrid__header--h2'>{useFormatApiKey(mapKey)}</h2>
      </div>
      <ul className='fdFlatGrid__wrapper'>
        {mapValue.map((values) => (
          <li className='fdFlatGrid__wrapper__li' key={values.id}>
            <article className='fdFlatGrid__wrapper__li__article'>
              <div className='fdFlatGrid__wrapper__li__article__graphic' onClick={() => useTmdbVideos(`${values.id}`)}>
                {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${values.poster_path}.svg`, alt: values.title as string })}

                <div className='fdFlatGrid__wrapper__li__article__graphic__overlay'>
                  <button
                    className='fdFlatGrid__wrapper__li__article__graphic__overlay--play'
                    aria-label='Play Trailer'
                    onClick={() => useTmdbVideos(`${values.id}`)}>
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
        ))}
      </ul>
    </section>
  );
};

export default FDFlatGrid;

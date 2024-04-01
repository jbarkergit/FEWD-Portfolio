// React
import { Link } from 'react-router-dom';
// Assets
import { BootstrapThreeDotsVertical } from '../../../assets/svg-icons/BootstrapThreeDotsVertical';
// Hooks
import useCreatePicture from '../../../hooks/component-creation/useCreatePicture';
import { useFormatDate } from '../../../hooks/formatters/useFormatDate';
// Types
import { Type_Tmdb_ApiCall_Union, Type_Tmdb_MovieList_Obj } from '../../../api/types/TmdbDataTypes';

type Type_PropDrill = {
  mapValue: Type_Tmdb_ApiCall_Union;
  useVideoPlayer: (propertyId: string) => Promise<void>;
  grid: boolean;
};

const FDPosterProp = ({ mapValue, useVideoPlayer, grid }: Type_PropDrill) => {
  const value: Type_Tmdb_MovieList_Obj = mapValue as unknown as Type_Tmdb_MovieList_Obj;
  return (
    <li className='FDMediaGrid__wrapper__ul__li' data-status={grid ? 'grid' : 'carousel'} key={value.id}>
      <article className='FDMediaGrid__wrapper__ul__li__article'>
        <div className='FDMediaGrid__wrapper__ul__li__article__graphic' onClick={() => useVideoPlayer(value.id)}>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${value.poster_path}.svg`, alt: value.title as string })}

          <div className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay'>
            {/* <button
              className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay--play'
              aria-label='Play Trailer'
              onClick={() => useVideoPlayer(`${value.id}`)}>
              {useCreatePicture({ svg: <MaterialPlayCircle />, alt: 'Play Trailer' })}
            </button> */}
            <button className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay--moreInfo' aria-label='More Information'>
              {useCreatePicture({ svg: <BootstrapThreeDotsVertical />, alt: 'More Information' })}
            </button>
          </div>
        </div>

        {/* <hgroup className='FDMediaGrid__wrapper__ul__li__article__hgroup'>
          <Link to='' aria-label={value.title}>
            <h2 className='FDMediaGrid__wrapper__ul__li__article__hgroup--h2'>{value.title}</h2>
          </Link>
          <Link to='' aria-label={value.title}>
            <h3 className='FDMediaGrid__wrapper__ul__li__article__hgroup--h3'>{useFormatDate(value.release_date)}</h3>
          </Link>
        </hgroup> */}
      </article>
    </li>
  );
};
export default FDPosterProp;

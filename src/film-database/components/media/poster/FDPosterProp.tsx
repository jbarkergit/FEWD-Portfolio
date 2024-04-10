import { Link } from 'react-router-dom';
// Components
import FDiFrame from '../iFrame/FDiFrame';
// Component Hooks
import useCreatePicture from '../../../hooks/component-creation/useCreatePicture';
import { useFormatDate } from '../../../hooks/formatters/useFormatDate';
// API Types
import { Type_Tmdb_ApiCall_Union, Type_Tmdb_ApiCallMovieList_Obj } from '../../../api/types/TmdbDataTypes';
import { Type_useFilmDatabaseWebStorage_Obj } from '../../../hooks/web-storage-api/useFilmDatabaseWebStorage';

type Type_PropDrill = {
  mapValue: Type_Tmdb_ApiCall_Union;
  grid: boolean;
  trailerCache: Type_useFilmDatabaseWebStorage_Obj[] | undefined;
  useFetchTrailer: (index: number) => void;
};

const FDPosterProp = ({ mapValue, grid, trailerCache, useFetchTrailer }: Type_PropDrill) => {
  const value: Type_Tmdb_ApiCallMovieList_Obj = mapValue as unknown as Type_Tmdb_ApiCallMovieList_Obj;

  return (
    <li className='FDMediaGrid__wrapper__ul__li' data-status={grid ? 'grid' : 'carousel'} onPointerUp={() => useFetchTrailer(value.id)} key={value.id}>
      <article className='FDMediaGrid__wrapper__ul__li__article'>
        <div className='FDMediaGrid__wrapper__ul__li__article__graphic'>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${value.poster_path}.svg`, alt: value.title as string })}
        </div>

        {!trailerCache?.some((obj) => obj.trailer_id === value.id) ? (
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
        ) : null}

        <FDiFrame trailerCache={trailerCache} mappedTrailerId={value.id} />
      </article>
    </li>
  );
};
export default FDPosterProp;

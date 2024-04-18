// Component Hooks
import useCreatePicture from '../../../hooks/useCreatePicture';
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
      </article>
    </li>
  );
};
export default FDPosterProp;

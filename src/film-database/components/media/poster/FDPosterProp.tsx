import { useState } from 'react';
import { Link } from 'react-router-dom';
// Component Hooks
import useCreatePicture from '../../../hooks/component-creation/useCreatePicture';
import { useFormatDate } from '../../../hooks/formatters/useFormatDate';
// API End Points
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
// API Hooks
import { useTmdbApi } from '../../../api/hooks/useTmdbApi';
// API Types
import { Type_Tmdb_ApiCall_Union, Type_Tmdb_ApiCallMovieList_Obj } from '../../../api/types/TmdbDataTypes';
import FDiFrame from '../iFrame/FDiFrame';

type Type_PropDrill = {
  mapValue: Type_Tmdb_ApiCall_Union;
  grid: boolean;
};

const FDPosterProp = ({ mapValue, grid }: Type_PropDrill) => {
  const [videoPlayerTrailer, setVideoPlayerTrailer] = useState<{ key: string; label?: string | undefined; value: Type_Tmdb_ApiCall_Union[] }[]>();

  const value: Type_Tmdb_ApiCallMovieList_Obj = mapValue as unknown as Type_Tmdb_ApiCallMovieList_Obj;
  return (
    <li className='FDMediaGrid__wrapper__ul__li' data-status={grid ? 'grid' : 'carousel'} key={value.id}>
      <article className='FDMediaGrid__wrapper__ul__li__article'>
        <div className='FDMediaGrid__wrapper__ul__li__article__graphic'>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${value.poster_path}.svg`, alt: value.title as string })}
        </div>

        {!videoPlayerTrailer ? (
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

        <FDiFrame videoPlayerTrailer={videoPlayerTrailer} setVideoPlayerTrailer={setVideoPlayerTrailer} trailerId={value.id} />
      </article>
    </li>
  );
};
export default FDPosterProp;

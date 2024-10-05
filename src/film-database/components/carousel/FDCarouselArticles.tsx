import { Dispatch, SetStateAction } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import { MaterialSymbolsPlayArrow } from '../../assets/google-material-symbols/iFrameSymbols';

type Type_FilmDatabase_Props = {
  articles: Type_Tmdb_Api_Union[];
  setHeroData: Dispatch<SetStateAction<Type_Tmdb_Api_Union | null>>;
  mapIndex: number;
};

const FDCarouselArticles = ({ articles, setHeroData, mapIndex }: Type_FilmDatabase_Props) => {
  return (
    <>
      {articles.map((article) => {
        const props = useTmdbProps(article);

        return (
          <li className='fdMedia__carousel__wrapper__ul__li' key={uuidv4()} onClick={() => setHeroData(article)}>
            <article className='fdMedia__carousel__wrapper__ul__li__article'>
              <header className='fdMedia__carousel__wrapper__ul__li__article__header'>
                <h2 className='fdMedia__carousel__wrapper__ul__li__article__header--h2'>{props?.heading}</h2>
              </header>
              <picture className='fdMedia__carousel__wrapper__ul__li__article__graphic'>
                <img src={`https://image.tmdb.org/t/p/original/${props?.poster_path}`} alt={`${props?.alt}`} fetchPriority={mapIndex === 0 ? 'high' : 'low'} />
              </picture>
            </article>
            <div className='fdMedia__carousel__wrapper__ul__li__overlay'>
              <button className='fdMedia__carousel__wrapper__ul__li__overlay--play' aria-label='Play trailer'>
                <MaterialSymbolsPlayArrow />
              </button>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default FDCarouselArticles;

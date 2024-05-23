import { v4 as uuidv4 } from 'uuid';

import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

type PropDrill = {
  data: Type_Tmdb_Api_Union[];
};

const FDCarouselArticles = ({ data }: PropDrill) => {
  return (
    <ul className='fdMedia__carousel__wrapper__ul'>
      {data.map((obj: Type_Tmdb_Api_Union) => {
        const props = useTmdbProps(obj);

        return (
          <li className='fdMedia__carousel__wrapper__ul__li' key={uuidv4()}>
            <article className='fdMedia__carousel__wrapper__ul__li__article'>
              <header className='fdMedia__carousel__wrapper__ul__li__article__header'>
                <h2>{props?.heading}</h2>
              </header>
              <div className='fdMedia__carousel__wrapper__ul__li__article__graphic'>
                <figure>
                  <picture>
                    <img src={`https://image.tmdb.org/t/p/original/${props?.poster_path}`} alt={`${props?.alt}`} />
                    <figcaption>{`${props?.alt}`}</figcaption>
                  </picture>
                </figure>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default FDCarouselArticles;

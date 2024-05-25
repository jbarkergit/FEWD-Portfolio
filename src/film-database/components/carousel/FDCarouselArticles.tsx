import { v4 as uuidv4 } from 'uuid';

import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

type Type_FilmDatabase_Props = {
  articles: Type_Tmdb_Api_Union[];
};

const FDCarouselArticles = ({ articles }: Type_FilmDatabase_Props) => {
  const updateNavigationIndex = () => {};

  return (
    <ul className='fdMedia__carousel__wrapper__ul' data-layout='carousel'>
      {articles.map((article) => {
        const props = useTmdbProps(article);

        return (
          <li className='fdMedia__carousel__wrapper__ul__li' key={uuidv4()}>
            <article className='fdMedia__carousel__wrapper__ul__li__article'>
              <header className='fdMedia__carousel__wrapper__ul__li__article__header'>
                <h2 className='fdMedia__carousel__wrapper__ul__li__article__header--h2'>{props?.heading}</h2>
              </header>
              <figure className='fdMedia__carousel__wrapper__ul__li__article__graphic'>
                <picture>
                  <img src={`https://image.tmdb.org/t/p/original/${props?.poster_path}`} alt={`${props?.alt}`} />
                  <figcaption>{`${props?.alt}`}</figcaption>
                </picture>
              </figure>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default FDCarouselArticles;

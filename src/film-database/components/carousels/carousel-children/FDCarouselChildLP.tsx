// lib
import { v4 as uuidv4 } from 'uuid';

// type imports
import { TmdbDataUnionArrayType, TmdbDataUnionType } from '../../../api/types/TmdbDataTypes';

// component creation
import useCreatePicture from '../../../component-creation/useCreatePicture';

//svg
import { IcRoundPlayCircle } from '../../../icons/IcRoundPlayCircle';
import { PhDotsThreeVerticalBold } from '../../../icons/PhDotsThreeVerticalBold';

// types
type PropDrillType = {
  data: TmdbDataUnionArrayType;
};

const formatDate = (date: string): string => {
  const currentDate: Date = new Date();
  const newDate: Date = new Date(date);
  if (newDate > currentDate) return `Coming ${`${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear().toString().slice(2)}`}`;
  else return 'Now Available on...';
};

const FDCarouselChildLP = ({ data }: PropDrillType): JSX.Element[] | undefined => {
  //NOTE: TS-IGNORE property 'results', data from api calls may be too broad, see useCreateCarousel component
  //@ts-ignore
  const { results } = data as TmdbDataUnionType;

  return results.map((data: TmdbDataUnionType) => (
    <div className='fdCarousel__container__block' key={uuidv4()}>
      <div className='fdCarousel__container__block__item'>
        <figure className='fdCarousel__container__block__item__graphic'>
          <picture>
            <img src={`https://image.tmdb.org/t/p/original/${data?.poster_path}.svg`}></img>
            <figcaption>{data?.original_title}</figcaption>
          </picture>
        </figure>
        <div className='fdCarousel__container__block__overlay'>
          <button aria-label='Play Trailer'>
            {useCreatePicture({ svg: <IcRoundPlayCircle />, alt: 'More Information', figcaption: 'More Information Selector' })}
          </button>
          <button aria-label='More Information'>
            {useCreatePicture({ svg: <PhDotsThreeVerticalBold />, alt: 'More Information', figcaption: 'More Information Selector' })}
          </button>
        </div>
      </div>

      <hgroup className='fdCarousel__container__block__footer'>
        <h2>{data?.title}</h2>
        <h3>{formatDate(data?.release_date!)}</h3>
      </hgroup>
    </div>
  ));
};

export default FDCarouselChildLP;

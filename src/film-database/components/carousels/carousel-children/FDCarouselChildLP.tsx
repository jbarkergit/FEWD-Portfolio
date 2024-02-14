// lib
import { v4 as uuidv4 } from 'uuid';

// type imports
import { TmdbDataUnionArrayType, TmdbDataUnionType } from '../../../api/types/TmdbDataTypes';

// component creation
import useCreatePicture from '../../../hooks/useCreatePicture';

// svg
import { MaterialPlayCircle } from '../../../icons/MaterialPlayCircle';
import { BootstrapThreeDotsVertical } from '../../../icons/PhDotsThreeVerticalBold';

// types
type PropDrillType = {
  dataObject: TmdbDataUnionArrayType;
};

const formatDate = (date: string): string => {
  const currentDate: Date = new Date();
  const newDate: Date = new Date(date);
  if (newDate > currentDate) return `Coming ${`${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear().toString().slice(2)}`}`;
  else return 'Now Available on...';
};

const FDCarouselChildLP = ({ dataObject }: PropDrillType): JSX.Element[] | undefined => {
  //NOTE: TS-IGNORE property 'results', data from api calls may be too broad, see useCreateCarousel component
  //@ts-ignore
  const { results } = dataObject as TmdbDataUnionType;

  return results.map((data: TmdbDataUnionType) => (
    <article className='fdCarousel__wrapper__container' key={uuidv4()}>
      <div className='fdCarousel__wrapper__container__graphic'>
        {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${data?.poster_path}.svg`, alt: data?.original_title as string })}

        <div className='fdCarousel__wrapper__container__graphic__overlay'>
          <button className='fdCarousel__wrapper__container__graphic__overlay--play' aria-label='Play Trailer'>
            {useCreatePicture({ svg: <MaterialPlayCircle />, alt: 'Play Trailer' })}
          </button>
          <button className='fdCarousel__wrapper__container__graphic__overlay--moreInfo' aria-label='More Information'>
            {useCreatePicture({ svg: <BootstrapThreeDotsVertical />, alt: 'More Information' })}
          </button>
        </div>
      </div>

      <hgroup className='fdCarousel__wrapper__container__info'>
        <h2 className='fdCarousel__wrapper__container__info--h2'>{data?.title}</h2>
        <h3 className='fdCarousel__wrapper__container__info--h3'>{formatDate(data?.release_date!)}</h3>
      </hgroup>
    </article>
  ));
};

export default FDCarouselChildLP;

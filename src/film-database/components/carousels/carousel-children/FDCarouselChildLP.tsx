import { useEffect, useState } from 'react';
import useCreatePicture from '../../../component-creation/useCreatePicture';
import { IcRoundPlayCircle } from '../../../icons/IcRoundPlayCircle';
import { PhDotsThreeVerticalBold } from '../../../icons/PhDotsThreeVerticalBold';

type PropDrillType = {
  data: {};
};

type NestedDataType = {
  [key: string]: { key: string; data: { [key: string]: any } };
};

type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const FDCarouselChildLP = ({ data }: PropDrillType): JSX.Element[] | undefined => {
  const [desiredData, setDesiredData] = useState<MovieType[]>([]);

  useEffect(() => {
    /**
     * maintaining data structures with alias refs, requires nested callback hell
     * note: extremely long variable name to remember steps required to retrieve nested data
     */
    const dataObjectEntriesKeyValuePairsFlattened = Object.entries<NestedDataType[]>(data)
      .map(([key, value]) => value)
      .flat();

    for (const valueObjects of dataObjectEntriesKeyValuePairsFlattened) {
      // TS-IGNORE property 'results', data may be too broad across different api calls
      // NOTE: to resolve this issue i'll have to manually add types via CLG for all variations of calls
      // given -> cannot find interface / types for various calls in their documentation

      // @ts-ignore
      const dataPropertyResults: MovieType[] = valueObjects.data.results;
      // console.log(dataPropertyResults);

      setDesiredData(dataPropertyResults);
    }
  }, []);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear().toString().slice(2)}`;

    const currentDate = new Date();

    if (newDate > currentDate) return `Coming ${formattedDate}`;
    else return 'Now Available on...';
  };

  if (desiredData)
    return desiredData.map((data) => (
      <div className='fdCarousel__container__block' key={data.id}>
        <div className='fdCarousel__container__block__item'>
          <figure className='fdCarousel__container__block__item__graphic'>
            <picture>
              <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}.svg`}></img>
              <figcaption>{data.original_title}</figcaption>
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
          <h2>{data.title}</h2>
          <h3>{formatDate(data.release_date)}</h3>
        </hgroup>
      </div>
    ));
};

export default FDCarouselChildLP;

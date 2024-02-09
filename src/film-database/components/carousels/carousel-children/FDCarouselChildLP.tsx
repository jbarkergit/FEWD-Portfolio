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

const FDCarouselChildLP = ({ data }: PropDrillType): JSX.Element[] | undefined => {
  const [desiredData, setDesiredData] = useState<{}[]>([]);

  /**
   * nested callback hell; however, to maintain data structures, this may be needed.
   * considering -> refactoring api call hooks to reduce nesting
   * given -> api call returns aliases for call
   * note: extremely long variable name to remember steps required to retrieve nested data
   */

  useEffect(() => {
    const dataObjectEntriesKeyValuePairsFlattened = Object.entries<NestedDataType[]>(data)
      .map(([key, value]) => value)
      .flat();

    for (const valueObjects of dataObjectEntriesKeyValuePairsFlattened) {
      // ignoring property 'results', data may be too broad across different api calls
      // @ts-ignore
      const dataPropertyResults: {}[] = valueObjects.data.results;
      console.log(dataPropertyResults);
      setDesiredData(dataPropertyResults);
    }
  }, []);

  if (desiredData)
    return desiredData.map((data) => (
      <div className='fdCarousel__block'>
        <div className='fdCarousel__block__graphic'>
          <figure className='fdCarousel__block__graphic__image'>
            <picture>
              <img src=''></img>
              <figcaption>Description</figcaption>
            </picture>
          </figure>
          <div className='fdCarousel__block__overlay'>
            <button aria-label='Play Trailer'>
              {useCreatePicture({ svg: <IcRoundPlayCircle />, alt: 'More Information', figcaption: 'More Information Selector' })}
            </button>
            <button aria-label='More Information'>
              {useCreatePicture({ svg: <PhDotsThreeVerticalBold />, alt: 'More Information', figcaption: 'More Information Selector' })}
            </button>
          </div>
          td
        </div>

        <hgroup className='fdCarousel__block__footer'>
          <h2>Movie title</h2>
          <h3>Release Date / Seasons</h3>
        </hgroup>
      </div>
    ));
};

export default FDCarouselChildLP;

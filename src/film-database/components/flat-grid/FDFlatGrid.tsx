import { Type_Tmdb_ApiCallUnion_Obj } from '../../api/types/TmdbDataTypes';
import useCreatePicture from '../../hooks/useCreatePicture';
import { useFormatApiKey } from '../../hooks/useFormatApiKey';
import { useFormatDate } from '../../hooks/useFormatDate';

type Type_PropDrill = {
  mapKey: string;
  mapValue: Type_Tmdb_ApiCallUnion_Obj[];
};

const FDFlatGrid = ({ mapKey, mapValue }: Type_PropDrill) => {
  return (
    <section className='fdFlatGrid'>
      <div className='fdFlatGrid__header'>
        <h2 className='fdFlatGrid__header--h2'>{useFormatApiKey(mapKey)}</h2>
      </div>
      <ul className='fdFlatGrid__wrapper'>
        {mapValue.map((values) => (
          <li className='fdFlatGrid__wrapper__li'>
            <article className='fdFlatGrid__wrapper__li__article'>
              {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${values.poster_path}.svg`, alt: values.title as string })}
              <hgroup className='fdFlatGrid__wrapper__li__article__hgroup'>
                <h2 className='fdFlatGrid__wrapper__li__article__hgroup--h2'>{values.title}</h2>
                <h3 className='fdFlatGrid__wrapper__li__article__hgroup--h3'>{useFormatDate(values.release_date)}</h3>
              </hgroup>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FDFlatGrid;

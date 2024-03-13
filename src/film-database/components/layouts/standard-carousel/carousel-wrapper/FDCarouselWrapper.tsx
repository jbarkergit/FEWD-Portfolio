// Lib
import { v4 as uuidv4 } from 'uuid';
// API Types
import { Type_Tmdb_ApiCallUnion_Obj } from '../../../../api/types/TmdbDataTypes';
// Carousel components
import FDCarouselChildLP from '../carousel/FDCarouselStandard';
// JSX component hooks
import useCreatePicture from '../../../../hooks/useCreatePicture';
// Hooks
import { useFormatApiKey } from '../../../../hooks/useFormatApiKey';
// SVG
import MaterialLeftCaret from '../../../../assets/svg-icons/MaterialLeftCaret';
import MaterialRightCaret from '../../../../assets/svg-icons/MaterialRightCaret';

type Type_PropDrill = {
  mapKey: string;
  mapValue: Type_Tmdb_ApiCallUnion_Obj[] | Type_Tmdb_ApiCallUnion_Obj;
};

const FDCarouselWrapper = ({ mapKey, mapValue }: Type_PropDrill) => {
  return (
    <section className='fdCarousel'>
      <h2 className='fdCarousel__heading'>
        <div className='fdCarousel__heading__textBlock'>{useFormatApiKey(mapKey)}</div>
      </h2>
      <div className='fdCarousel__wrapper'>
        {Array.isArray(mapValue) ? (
          mapValue.map((values) => <FDCarouselChildLP value={values} key={uuidv4()} />)
        ) : (
          <FDCarouselChildLP value={mapValue} key={uuidv4()} />
        )}
        <nav className='fdCarousel__wrapper__navigation'>
          <button className='fdCarousel__wrapper__navigation--button' aria-label='Show Previous'>
            {useCreatePicture({ svg: <MaterialLeftCaret />, alt: 'Show Previous' })}
          </button>
          <button className='fdCarousel__wrapper__navigation--button' aria-label='Show More'>
            {useCreatePicture({ svg: <MaterialRightCaret />, alt: 'Show More' })}
          </button>
        </nav>
      </div>
    </section>
  );
};

export default FDCarouselWrapper;

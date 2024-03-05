// Lib
import { v4 as uuidv4 } from 'uuid';
// API Types
import { Type_Tmdb_ApiCallUnion_Obj } from '../../../api/types/TmdbDataTypes';
// Carousel components
import FDCarouselHeading from '../carousel-headers/FDCarouselHeading';
import FDCarouselChildLP from '../carousel-children/FDCarouselChildLP';
// JSX component hooks
import useCreatePicture from '../../../hooks/useCreatePicture';
// SVG
import MaterialLeftCaret from '../../../icons/MaterialLeftCaret';
import MaterialRightCaret from '../../../icons/MaterialRightCaret';

type Type_PropDrill = {
  mapKey: string;
  mapValue: Type_Tmdb_ApiCallUnion_Obj[] | Type_Tmdb_ApiCallUnion_Obj;
};

const FDCarouselWrapper = ({ mapKey, mapValue }: Type_PropDrill) => {
  return (
    <section className='fdCarousel'>
      <FDCarouselHeading heading={mapKey} />
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

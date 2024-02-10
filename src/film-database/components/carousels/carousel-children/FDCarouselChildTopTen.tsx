// types
import { TmdbDataUnionArrayType } from '../../../api/types/TmdbDataTypes';

type PropDrillType = {
  data: TmdbDataUnionArrayType;
};

const FDCarouselChildTopTen = ({ data }: PropDrillType) => {
  return <div>FDCarouselChildTopTen</div>;
};
export default FDCarouselChildTopTen;

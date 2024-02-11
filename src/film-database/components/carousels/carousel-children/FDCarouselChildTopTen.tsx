// types
import { TmdbDataUnionArrayType } from '../../../api/types/TmdbDataTypes';

type PropDrillType = {
  dataObject: TmdbDataUnionArrayType;
};

const FDCarouselChildTopTen = ({ dataObject }: PropDrillType) => {
  return <div>FDCarouselChildTopTen</div>;
};
export default FDCarouselChildTopTen;

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

type Type_PropDrill = {
  responseSets: Type_Tmdb_Api_Union[][];
};

const FDAccountBackgroundSlider = ({ responseSets }: Type_PropDrill) => {
  return <div>FDAccountBackgroundSlider</div>;
};

export default FDAccountBackgroundSlider;

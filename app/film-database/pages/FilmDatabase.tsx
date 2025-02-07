import type { Route } from '../../+types/root';
import FDCatalog from './FDCatalog';
import FDUserAccount from './FDUserAccount';

const FilmDatabase = ({ loaderData }: Route.ComponentProps) => {
  if (loaderData.user && loaderData.verified) return <FDCatalog />;
  else return <FDUserAccount />;
};

export default FilmDatabase;

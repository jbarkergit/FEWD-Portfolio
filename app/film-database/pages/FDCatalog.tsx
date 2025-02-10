import { redirect } from 'react-router';
// Authorization && Context
import { isAuth } from '~/base/context/authProvider';
import { CatalogProvider } from '../context/CatalogContext';
// Features
import FDHeader from '../features/catalog/header/FDHeader';
import FDHero from '../features/catalog/hero/FDHero';
import FDMedia from '../features/catalog/media/FDMedia';
import FDMovieModal from '../features/catalog/modals/FDMovieModal';

export async function clientLoader() {
  // await new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve(undefined);
  //   }, 2000)
  // );
  const isLogged = await isAuth();
  if (isLogged) {
    return redirect('/film-database');
  }
}

const FDCatalog = () => {
  return (
    <div className='filmDatabase'>
      <CatalogProvider>
        <FDHeader />
        <div className='fdCatalog' data-layout-carousel>
          <FDHero />
          <FDMedia />
          <FDMovieModal />
        </div>
      </CatalogProvider>
    </div>
  );
};

export default FDCatalog;

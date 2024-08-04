// Deps
import { useState, useEffect } from 'react';
// Pages
import FDUserAccount from './user-account/FDUserAccount';
import FDCatalog from './catalog/FDCatalog';

const FilmDatabase = () => {
  /** filmDatabase Breakpoint Attr
   * Breakpoints at 25% of second row's poster
   */
  const [layoutAttr, setLayoutAttr] = useState<string>('xxl');

  const getDataLayout = (): void => {
    let layout: string;

    switch (true) {
      case window.innerWidth >= 1410:
        layout = 'xxl';
        break;

      case window.innerWidth < 1410 && window.innerWidth > 1212:
        layout = 'xl';
        break;

      case window.innerWidth <= 1212 && window.innerWidth > 1032:
        layout = 'l';
        break;

      case window.innerWidth <= 1032 && window.innerWidth > 836:
        layout = 'm';
        break;

      case window.innerWidth <= 836 && window.innerWidth > 632:
        layout = 's';
        break;

      case window.innerWidth <= 632 && window.innerWidth > 0:
        layout = 'xs';
        break;

      default:
        layout = 'xxl';
        break;
    }

    setLayoutAttr((prevLayout) => {
      if (prevLayout !== layout) {
        return layout;
      } else {
        return prevLayout;
      }
    });
  };

  useEffect(() => {
    getDataLayout();
    window.addEventListener('resize', getDataLayout);
    return () => window.removeEventListener('resize', getDataLayout);
  }, []);

  return (
    <div className='filmDatabase' data-layout-carousel={layoutAttr}>
      {/* <FDUserAccount /> */}
      <FDCatalog />
    </div>
  );
};

export default FilmDatabase;

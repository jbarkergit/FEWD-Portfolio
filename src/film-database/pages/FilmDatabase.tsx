// Deps
import { useState, useEffect, useRef } from 'react';
// Firebase
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';
// Pages
import FDUserAccount from './FDUserAccount';
import FDCatalog from './FDCatalog';

type Type_authorizedUser = {
  user: undefined | User;
  verified: boolean;
};

const FilmDatabase = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  /** Firebase user auth */
  const [isUserFetched, setIsUserFetched] = useState<boolean>(false);

  const [authorizedUser, setAuthorizedUser] = useState<Type_authorizedUser>({
    user: undefined,
    verified: false,
  });

  useEffect(() => {
    const authListener = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setAuthorizedUser({ user: undefined, verified: false });
      } else {
        setAuthorizedUser({ user: user, verified: user.emailVerified });
      }

      setIsUserFetched(true);
    });

    return () => authListener();
  }, []);

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
    <div className='filmDatabase' data-layout-carousel={layoutAttr} ref={rootRef}>
      {isUserFetched ? authorizedUser.user && authorizedUser.verified ? <FDCatalog /> : <FDUserAccount rootRef={rootRef} /> : null}
    </div>
  );
};

export default FilmDatabase;

// Deps
import { useState, useEffect, useRef, lazy, startTransition } from 'react';
// Firebase
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../app/config/firebaseConfig';
// Pages
const FDUserAccount = lazy(() => import('../layouts/FDUserAccount'));
const FDCatalog = lazy(() => import('../layouts/FDCatalog'));

type Type_authorizedUser = {
  user: undefined | User;
  verified: boolean;
};

const FilmDatabase = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  /** Firebase user auth */
  const [authorizedUser, setAuthorizedUser] = useState<Type_authorizedUser>({
    user: undefined,
    verified: false,
  });

  useEffect(() => {
    const authListener = onAuthStateChanged(firebaseAuth, (user) => {
      startTransition(() => {
        if (!user) setAuthorizedUser({ user: undefined, verified: false });
        else setAuthorizedUser({ user: user, verified: user.emailVerified });
      });
    });

    return () => authListener();
  }, []);

  /** filmDatabase Breakpoint Attr
   * Breakpoints at 25% of second row's poster
   */
  const [layoutAttr, setLayoutAttr] = useState<string>('xxl');

  const getDataLayout = (): void => {
    const winX: number = window.innerWidth;
    let layout: string;

    switch (true) {
      case winX >= 1410:
        layout = 'xxl';
        break;

      case winX < 1410 && winX > 1212:
        layout = 'xl';
        break;

      case winX <= 1212 && winX > 1032:
        layout = 'l';
        break;

      case winX <= 1032 && winX > 836:
        layout = 'm';
        break;

      case winX <= 836 && winX > 632:
        layout = 's';
        break;

      case winX <= 632 && winX > 0:
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

  /** Component */
  return (
    <div className='filmDatabase' data-layout-carousel={layoutAttr} ref={rootRef}>
      {/* {!authorizedUser.user && !authorizedUser.verified ? <FDUserAccount rootRef={rootRef} /> : <FDCatalog />} */}
      <FDCatalog />
    </div>
  );
};

export default FilmDatabase;

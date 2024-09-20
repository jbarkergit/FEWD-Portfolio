// Deps
import { useState, useEffect, useRef, lazy, startTransition } from 'react';
// Firebase
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebaseConfig';
// Pages
const FDUserAccount = lazy(() => import('./FDUserAccount'));
const FDCatalog = lazy(() => import('./FDCatalog'));

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
  if (!authorizedUser.user) {
    return (
      <div className='fdLoading'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            fill='none'
            stroke='currentColor'
            strokeDasharray='15'
            strokeDashoffset='15'
            strokeLinecap='round'
            strokeWidth='2'
            d='M12 3C16.9706 3 21 7.02944 21 12'>
            <animate fill='freeze' attributeName='stroke-dashoffset' dur='0.3s' values='15;0'></animate>
            <animateTransform attributeName='transform' dur='1.5s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'></animateTransform>
          </path>
        </svg>
      </div>
    );
  } else {
    return (
      <div className='filmDatabase' data-layout-carousel={layoutAttr} ref={rootRef}>
        {authorizedUser.user && authorizedUser.verified ? <FDCatalog /> : <FDUserAccount rootRef={rootRef} />}
      </div>
    );
  }
};

export default FilmDatabase;

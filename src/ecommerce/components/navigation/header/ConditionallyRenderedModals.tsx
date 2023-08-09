import { useModalContext } from '../../../context/ModalContext';
import ShoppingCart from '../../features/shopping-cart/ShoppingCart';
import UserLoginModal from '../../user-account/user-account-login/UserLoginModal';
import UserRegisterModal from '../../user-account/user-account-register/UserRegisterModal';

const ConditionallyRenderedModals = (): JSX.Element | undefined => {
  // @ts-ignore
  const { ecoModalTab } = useModalContext();

  switch (ecoModalTab) {
    case 'shoppingCart':
      return <ShoppingCart dataStatus={ecoModalTab} />;
    case 'userLogin':
      return <UserLoginModal dataStatus={ecoModalTab} />;
    // case 'register':
    // return <UserRegisterModal dataStatus={modalStatus} />;
    default:
      null;
  }
};

export default ConditionallyRenderedModals;

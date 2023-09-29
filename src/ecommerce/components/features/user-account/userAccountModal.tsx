import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import UserLoginModal from './user-account-modal-login/UserLoginModal';
import UserAccountRegistry from './user-account-modal-registry/UserAccountRegistry';
import UserAccountActive from './user-account-modal-active/UserAccountActive';

//Prop drilling from header
type UserAccountModalType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserAccountModal = ({ uiModal, setUiModal }: UserAccountModalType): JSX.Element => {
  //User authentication state
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);

  //Set user auth state in localStorage
  useEffect(() => localStorage.setItem('userSignedIn', JSON.stringify(userSignedIn)), [userSignedIn]);

  switch (uiModal) {
    case 'userLogin':
      return <UserLoginModal uiModal={uiModal} setUiModal={setUiModal} setUserSignedIn={setUserSignedIn} />;
    case 'userRegistry':
      return <UserAccountRegistry uiModal={uiModal} setUiModal={setUiModal} />;
    case 'userActive':
      if (userSignedIn) return <UserAccountActive />;
    default:
      return <UserLoginModal uiModal={uiModal} setUiModal={setUiModal} setUserSignedIn={setUserSignedIn} />;
  }
};

export default UserAccountModal;

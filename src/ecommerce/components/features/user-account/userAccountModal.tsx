import { Dispatch, SetStateAction, useState } from 'react';
import UserLoginModal from './user-account-modal-login/UserLoginModal';
import UserAccountRegistry from './user-account-modal-registry/UserAccountRegistry';
import UserAccountActive from './user-account-modal-active/UserAccountActive';

//Prop drilling
type UserAccountModalType = {
  uiModal: string;
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserAccountModal = ({ uiModal, setUiModal }: UserAccountModalType): JSX.Element => {
  //User authentication
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);

  const ConditionallyRenderedAccountModals = (): JSX.Element => {
    if (uiModal === 'userLogin' && !userSignedIn) return <UserLoginModal uiModal={uiModal} setUiModal={setUiModal} />;
    else if (uiModal === 'userLogin' && userSignedIn) return <UserAccountActive />;
    else if (uiModal === 'userRegistry') return <UserAccountRegistry />;
    else return <UserAccountRegistry />;
  };

  return ConditionallyRenderedAccountModals();
};

export default UserAccountModal;

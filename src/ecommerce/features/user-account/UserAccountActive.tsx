import { Dispatch, SetStateAction } from 'react';

//Prop drill from UserAccountModal
type PropType = {
  setUiModal: Dispatch<SetStateAction<string>>;
};

const UserAccountActive = ({ setUiModal }: PropType) => {
  return (
    <div className='ecoModal__container'>
      <legend>
        <h2>My Account</h2>
      </legend>
      <p>Hello, {JSON.parse(localStorage.getItem('firstName')!)}! Thank you for testing my field validation/user authentication form simulation.</p>
      <div className='ecoModal__container__buttons'>
        <button
          aria-label='Log out of your account'
          onClick={() => {
            localStorage.setItem('userSignedIn', JSON.stringify(false));
            setUiModal('userLogin');
          }}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserAccountActive;

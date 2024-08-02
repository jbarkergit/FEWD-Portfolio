import TDAREmailAddress from '../../../components/account/registery/FDAREmailAddress';
import TDARFirstName from '../../../components/account/registery/FDARFirstName';
import TDARLastName from '../../../components/account/registery/FDARLastName';
import TDARPassword from '../../../components/account/registery/FDARPassword';

const FDAccountRegistery = () => {
  return (
    <form className='fdUserAccount__form' id='fdRegistery'>
      <div className='fdUserAccount__form__container'>
        <fieldset>
          <legend>
            <h2>Create an account</h2>
          </legend>
          <ul>
            <TDARFirstName />
            <TDARLastName />
            <TDAREmailAddress />
            <TDARPassword />
          </ul>
        </fieldset>
      </div>
    </form>
  );
};

export default FDAccountRegistery;

import TDAREmailAddress from '../../../components/account/registery/FDAREmailAddress';
import TDARFirstName from '../../../components/account/registery/FDARFirstName';
import TDARLastName from '../../../components/account/registery/FDARLastName';
import TDARPassword from '../../../components/account/registery/FDARPassword';

const FDAccountRegistery = () => {
  return (
    <form className='fdUserAccount__form' id='fdRegistery'>
      <fieldset className='fdUserAccount__form__fieldset'>
        <legend className='fdUserAccount__form__fieldset__legend'>
          <h2 className='fdUserAccount__form__fieldset__legend--h2'>Create an account</h2>
        </legend>
        <ul className='fdUserAccount__form__ul'>
          <TDARFirstName />
          <TDARLastName />
          <TDAREmailAddress />
          <TDARPassword />
        </ul>
      </fieldset>
    </form>
  );
};

export default FDAccountRegistery;

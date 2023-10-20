import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

type ModalStateType = {
  useFilterData: string[];
  modalStatus: boolean;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
};

const CompanyFilterButtons = ({ useFilterData, modalStatus, setModalStatus }: ModalStateType) => {
  // @ts-ignore
  const { setCategoryFilter } = useCategoryFilterContext<StateContextType | undefined>();

  //useNavigate Hook from react-router-dom, has to be stored in a reference variable
  const useNav: NavigateFunction = useNavigate();

  //Note: useFilterData doesn't need to be envoked because we're passing the data pre-envoked so the data is already available
  return (
    <>
      {useFilterData.map((data: string) => (
        <li className='selectMenu__accordion--option' key={uuidv4()}>
          <button
            onClick={() => {
              setModalStatus(modalStatus ? false : true);
              setCategoryFilter(data);
              useNav(`/ecommerce/${data}`);
            }}>
            {data}
          </button>
        </li>
      ))}
    </>
  );
};
export default CompanyFilterButtons;

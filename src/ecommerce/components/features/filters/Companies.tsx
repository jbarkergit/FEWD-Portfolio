import { v4 as uuidv4 } from 'uuid';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';
import { ProductType } from '../../../context/ProductType';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const useCompanies = () => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext();
  return (
    <>
      {[...new Set(ProductDatabase.map((product: ProductType) => product.company))]
        .sort((a, b) => (a > b ? 1 : -1))
        .map((company) => (
          <li className="selectMenu__menu--option" key={uuidv4()}>
            <button id={company} onClick={() => setCategoryFilter(`${company}`)}>
              {company}
            </button>
          </li>
        ))}
    </>
  );
};

export default useCompanies;

import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';
import { ProductType } from '../../../types/ProductType';

const Companies = memo(() => {
  //@ts-ignore
  const { setCategoryFilter } = useCategoryFilterContext();
  const handleClick = (company: string) => setCategoryFilter(company);
  const uniqueCompanies = [...new Set(ProductDatabase.map((product: ProductType) => product.company))].sort((a, b) => (a > b ? 1 : -1));

  return (
    <>
      {uniqueCompanies.map((company) => (
        <li className="selectMenu__accordion--option" key={uuidv4()}>
          <button id={company} onClick={() => handleClick(company)}>
            {company}
          </button>
        </li>
      ))}
    </>
  );
});

export default Companies;

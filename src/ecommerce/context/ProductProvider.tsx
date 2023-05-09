import { ProductDatabase } from '../data/ProductDatabase';
import { useCategoryFilterContext } from './CategoryFilterContext';

export type ProductType = {
  category: string;
  sku: string;
  company: string;
  unit: string;
  description: string;
  price: number;
  srcset: string;
};

export const ProductProvider = () => {
  const { categoryFilter } = useCategoryFilterContext; //setCategoryFilter
  return (
    <>
      {/* Filters ProductDatabase with useState(category) as conditional param then maps filtered array of objects */}
      {ProductDatabase.filter((product) => product.category.includes(categoryFilter)).map((filteredData: ProductType) => (
        <li>
          <span>
            {filteredData.category}, {filteredData.sku}, {filteredData.company}, {filteredData.unit}, {filteredData.description}, {filteredData.price},
            {filteredData.srcset}
          </span>
        </li>
      ))}
    </>
  );
};

// Life cycle reference
// useEffect(() => {
//   // const componentDidMount = () => {};
//   // const componentDidUpdate = () => {};
//   // const componentWillUnmount = () => {};
// }, []);

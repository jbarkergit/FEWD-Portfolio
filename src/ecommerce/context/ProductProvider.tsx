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
  // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider
  const { categoryFilter, setCategoryFilter } = useCategoryFilterContext();
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
//   // const componentDidUpdate = () => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setCategoryFilter(event.target.value);
// }};
//   // const componentWillUnmount = () => {};
// }, []);

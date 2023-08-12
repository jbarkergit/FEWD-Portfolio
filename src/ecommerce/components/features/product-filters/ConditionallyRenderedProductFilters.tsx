import { useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import useUniqueData from '../../../hooks/useUniqueData';
import ProductFilterConstructor from './ProductFilterConstructor';

const ConditionallyRenderedProductFilters = () => {
  //   @ts-ignore
  const { categoryFilter } = useCategoryFilterContext();
  //Filter Components built with ProductFilterConstructor: takes initial filter name and custom hook that returns data
  //Data filtered via reduce method using useUniqueData custom hook
  const PolarPatternFilter = (): JSX.Element => ProductFilterConstructor('Filter by Polar Pattern', useUniqueData().useUniquePolarPatterns);
  const WearStyleFilter = (): JSX.Element => ProductFilterConstructor('Filter by Wear Style', useUniqueData().useUniqueWearStyles);
  //Condition for renders
  const useLoc = useLocation().pathname.replace('/ecommerce/', '');

  if (useLoc === 'headphones' || useUniqueData().useUniqueWearStyles.includes(useLoc)) return <WearStyleFilter />;
  else if (useLoc === 'microphones' || useUniqueData().useUniquePolarPatterns.includes(useLoc)) return <PolarPatternFilter />;
};

export default ConditionallyRenderedProductFilters;

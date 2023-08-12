import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useUniqueData from '../../../hooks/useUniqueData';
import ProductFilterConstructor from './ProductFilterConstructor';

const ConditionallyRenderedProductFilters = () => {
  //Memoized data dependencies
  const uniqueWearStyles = useMemo(() => useUniqueData().useUniqueWearStyles, [useUniqueData().useUniqueCompanies]);
  const uniquePolarPatterns = useMemo(() => useUniqueData().useUniquePolarPatterns, [useUniqueData().useUniquePolarPatterns]);
  //Filter Components built with ProductFilterConstructor: takes initial filter name and custom hook that returns data
  //Data filtered via reduce method using useUniqueData custom hook
  const WearStyleFilter = (): JSX.Element => ProductFilterConstructor('Filter by Wear Style', uniqueWearStyles);
  const PolarPatternFilter = (): JSX.Element => ProductFilterConstructor('Filter by Polar Pattern', uniquePolarPatterns);

  //Condition for renders
  const useLoc = useLocation().pathname.replace('/ecommerce/', '');

  if (useLoc === 'headphones' || uniqueWearStyles.includes(useLoc)) return <WearStyleFilter />;
  else if (useLoc === 'microphones' || uniquePolarPatterns.includes(useLoc)) return <PolarPatternFilter />;
};

export default ConditionallyRenderedProductFilters;

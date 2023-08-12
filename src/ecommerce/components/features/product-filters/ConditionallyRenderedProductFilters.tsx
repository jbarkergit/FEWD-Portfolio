import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useUniqueData from '../../../hooks/useUniqueData';
import ProductFilterConstructor from './ProductFilterConstructor';

const ConditionallyRenderedProductFilters = () => {
  //Memoized data dependencies
  const uniqueWearStyles = useMemo(() => useUniqueData().useUniqueWearStyles, [useUniqueData().useUniqueCompanies]);
  const uniquePolarPatterns = useMemo(() => useUniqueData().useUniquePolarPatterns, [useUniqueData().useUniquePolarPatterns]);

  //Filter Components built with ProductFilterConstructor: takes initial filter name and custom hook that returns data
  const WearStyleFilter = (): JSX.Element => ProductFilterConstructor('Filter by Wear Style', uniqueWearStyles);
  const PolarPatternFilter = (): JSX.Element => ProductFilterConstructor('Filter by Polar Pattern', uniquePolarPatterns);

  //Memoized conditional data dependencies for conditional rendering
  const uniqueHeadphoneCompanies = useMemo(() => useUniqueData().useUniqueHeadphoneCompanies, [useUniqueData().useUniqueHeadphoneCompanies]);
  const uniqueMicrophoneCompanies = useMemo(() => useUniqueData().useUniqueMicrophoneCompanies, [useUniqueData().useUniqueMicrophoneCompanies]);

  //Variable dependencies for conditional rendering
  const regexPattern = /\/ecommerce\//g;
  const location = useLocation().pathname.replace(regexPattern, '');

  //Conditional rendering
  if (location === 'products')
    return (
      <>
        <WearStyleFilter />
        <PolarPatternFilter />
      </>
    );
  if (['headphones', ...uniqueHeadphoneCompanies, ...uniqueWearStyles].includes(location)) return <WearStyleFilter />;
  if (['microphones', ...uniqueMicrophoneCompanies, ...uniquePolarPatterns].includes(location)) return <PolarPatternFilter />;
};

export default ConditionallyRenderedProductFilters;

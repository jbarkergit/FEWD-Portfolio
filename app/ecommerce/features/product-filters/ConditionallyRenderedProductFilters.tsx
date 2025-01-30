import { useLocation } from 'react-router';
import { useUniqueData } from '../../hooks/useUniqueData';
import ProductFilterConstructor from './ProductFilterConstructor';

const ConditionallyRenderedProductFilters = () => {
  // Memoized data dependencies
  const uniqueWearStyles: string[] = useUniqueData().useUniqueWearStyles;
  const uniquePolarPatterns: string[] = useUniqueData().useUniquePolarPatterns;

  // Filter Components built with ProductFilterConstructor: takes initial filter name and custom hook that returns data
  const WearStyleFilter = () => ProductFilterConstructor('Filter by Wear Style', uniqueWearStyles);
  const PolarPatternFilter = () => ProductFilterConstructor('Filter by Polar Pattern', uniquePolarPatterns);

  // Memoized conditional data dependencies for conditional rendering
  const uniqueHeadphoneCompanies: string[] = useUniqueData().useUniqueHeadphoneCompanies;
  const uniqueMicrophoneCompanies: string[] = useUniqueData().useUniqueMicrophoneCompanies;

  // Variable dependencies for conditional rendering
  const regexPattern: RegExp = /\/ecommerce\//g;
  const location: string = useLocation().pathname.replace(regexPattern, '');

  // Conditional rendering
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

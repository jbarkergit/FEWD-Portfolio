import { ProductDatabase } from '../../assets/data/ProductDatabase';

export const companyList = [...new Set(ProductDatabase.map((product) => product.company))];
export const formatCurrency = Intl.NumberFormat('en-us', { currency: 'USD', style: 'currency' });

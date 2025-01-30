import { useContext } from 'react';
import { type UseCartContextType, CartContext } from '../context/CartContext';

export const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

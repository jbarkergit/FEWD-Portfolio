import { useContext } from 'react';
import { CartContext, UseCartContextType } from '../context/CartContext';

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;

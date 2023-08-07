const EmptyCart = () => {
  return (
    <section className="ecoModal__products__emptyCart">
      <div className="ecoModal__products__emptyCart__header">
        <span>{'Your cart is empty. Ready to upgrade your setup?'}</span>
      </div>
      <div className="ecoModal__products__emptyCart__buttons">
        <button>{'Shop Headphones'}</button>
        <button>{'Shop Amps & Dacs'}</button>
        <button>{'Shop Microphones'}</button>
        <button>{'Shop Interfaces'}</button>
        <button>{'Browse All Products'}</button>
      </div>
    </section>
  );
};
export default EmptyCart;

const ShoppingCart = () => {
  return (
    <section className="shoppingModal" data-activity="inactive">
      <div className="shoppingCart">
        <div className="shoppingCart__heading">
          <h2>Shopping Cart</h2>
        </div>
        <ul className="shoppingCart__products">
          <></>
        </ul>
        <div className="shoppingCart__orderDetails">
          <span>
            <h3>Total Items: {}</h3>
          </span>
          <span>
            <h3>Subtotal: {}</h3>
          </span>
        </div>
        <div className="shoppingCart__checkout">
          <button>Checkout</button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

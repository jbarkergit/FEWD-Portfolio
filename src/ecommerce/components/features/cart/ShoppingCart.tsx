const ShoppingCart = () => {
  return (
    <section className="shoppingModal" data-activity="inactive">
      <div className="shoppingCart">
        <div className="shoppingCart__heading">
          <h2>Shopping Cart</h2>
        </div>
        <ul className="ShoppingCart__products">
          <></>
        </ul>
        <div className="shoppingCart__orderDetails flexBox flexColumn">
          <span className="shoppingCart__orderDetails--totalItems">
            <h4>Total Items: {}</h4>
          </span>
          <span className="shoppingCart__orderDetails--subtotal">
            <h3>Subtotal: {}</h3>
          </span>
        </div>
        <div>
          <button className="shoppingCart__checkout">Checkout</button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

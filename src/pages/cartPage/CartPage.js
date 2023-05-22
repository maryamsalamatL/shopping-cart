import { useCart, useCartActions } from "../../provider/CartProvider";
import styles from "./CartPage.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();
  useEffect(() => {
    dispatch({ type: "TOTAL_PRICE" });
  }, [cart]);

  return (
    <main>
      {cart.length ? (
        <section className={styles.mainContainer}>
          <CartDetails cart={cart} />
          <CartSummary cart={cart} />
        </section>
      ) : (
        <p>this is cart page</p>
      )}
    </main>
  );
};

export default CartPage;

const CartDetails = ({ cart }) => {
  const dispatch = useCartActions();
  return (
    <ul className={styles.cartDetails}>
      {cart.map((item) => (
        <li key={item.id} className={styles.cartItem}>
          <div className={styles.cartItemImg}>
            <img src={item.image}></img>
          </div>
          <div className={styles.cartItemInfo}>
            <h3>{item.name}</h3>
            <span>{item.price * item.quantity}</span>
            <div>
              <button
                className={styles.btn}
                onClick={() =>
                  dispatch({ type: "REMOVE_PRODUCT", payload: item })
                }
              >
                {item.quantity === 1 ? "remove" : "-"}
              </button>
              <button className={styles.btn}>{item.quantity}</button>
              <button
                className={styles.btn}
                onClick={() =>
                  dispatch({ type: "ADD_ONE_TO_CART", payload: item })
                }
              >
                +
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const CartSummary = () => {
  const { total } = useCart();
  return (
    <div>
      <h2>Cart Summary</h2>
      <h4>total : $ {total}</h4>
      <Link to="/checkout">
        <button>Go to checkout</button>
      </Link>
    </div>
  );
};

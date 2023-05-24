import { useCart, useCartActions } from "../../provider/CartProvider";
import styles from "./CartPage.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiCheckbox, BiCheckboxChecked, BiTrash } from "react-icons/bi";

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
  // const [check, setCheck] = useState(true);

  const dispatch = useCartActions();
  return (
    <div className={styles.cartDetails}>
      <div className={styles.titleSec}>
        <h2>Cart</h2>
        <button onClick={() => dispatch("CLEAR_CART")}>
          <BiTrash />
          Remove
        </button>
      </div>
      <ul className={styles.cartList}>
        {cart.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            {/* <button
              className={styles.checkBtn}
              onClick={() => setCheck(!check)}
            >
              {check ? <BiCheckboxChecked /> : <BiCheckbox />}
            </button> */}
            <div className={styles.cartItemImg}>
              <img src={item.image}></img>
            </div>
            <div className={styles.cartItemInfo}>
              <h3>{item.name}</h3>
              <div className={styles.qtyBtnBox}>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    dispatch({ type: "INCREMENT_PRODUCT", payload: item })
                  }
                >
                  {item.quantity === 1 ? "remove" : "-"}
                </button>
                <button className={styles.qtyBtn}>{item.quantity}</button>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    dispatch({ type: "ADD_ONE_TO_CART", payload: item })
                  }
                >
                  +
                </button>
              </div>
              <span>{item.price * item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSummary = () => {
  const { total } = useCart();
  return (
    <div className={styles.cartSummary}>
      <h2>Cart Summary</h2>
      <h4>total : $ {total}</h4>
      <Link to="/checkout">
        <button>Go to checkout</button>
      </Link>
    </div>
  );
};

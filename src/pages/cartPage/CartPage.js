import { useCart, useCartActions } from "../../provider/CartProvider";
import styles from "./CartPage.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiTrash, BiChevronLeftSquare } from "react-icons/bi";
import { useAuth } from "../../provider/AuthProvider";

const CartPage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  useEffect(() => {
    dispatch({ type: "TOTAL_PRICE" });
  }, [cart]);
  return (
    <main className={styles.main}>
      {cart.length ? (
        <section className={styles.mainContainer}>
          <CartDetails cart={cart} />
          <CartSummary cart={cart} />
        </section>
      ) : (
        <>
          <h2>Cart is empty</h2>
          <Link to="/" className={styles.link}>
            <BiChevronLeftSquare /> go to store
          </Link>
        </>
      )}
    </main>
  );
};

export default CartPage;

const CartDetails = ({ cart }) => {
  const dispatch = useCartActions();
  return (
    <div className={styles.cartDetails}>
      <div className={styles.topSec}>
        <h2>Cart</h2>
        <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
          <BiTrash />
          Remove
        </button>
      </div>
      <div className={styles.listTitle}>
        <div>
          <p>product</p>
        </div>
        <div>
          <p>quantity</p>
          <p>price</p>
        </div>
      </div>
      <ul className={styles.cartList}>
        {cart.map((item) => (
          <li key={item._id} className={styles.cartItem}>
            <div className={styles.firstCol}>
              <div className={styles.cartItemImg}>
                <img src={item.image}></img>
              </div>
              <h3>{item.name}</h3>
            </div>
            <div className={styles.cartItemInfo}>
              <div className={styles.secondCol}>
                <div className={styles.qtyBtnBox}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() =>
                      dispatch({ type: "INCREMENT_PRODUCT", payload: item })
                    }
                  >
                    {item.quantity === 1 ? <BiTrash /> : "-"}
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
              </div>
              <div className={styles.thirdCol}>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSummary = () => {
  const { total } = useCart();
  const { cart } = useCart();
  const totalPrice = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const auth = useAuth();
  return (
    <div className={styles.cartSummary}>
      <h2>Cart Summary</h2>
      <div>
        <span>cart total :</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div>
        <span>cart discount :</span>
        <span>${(totalPrice - total).toFixed(2)}</span>
      </div>
      <div className={styles.netPrice}>
        <span>net price:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Link to={`${auth ? "/checkout" : "/signup?redirect=checkout"}`}>
        <button>Go to checkout</button>
      </Link>
    </div>
  );
};

import * as data from "../../data";
import styles from "./HomePage.module.css";
import { useCartActions, useCart } from "../../provider/CartProvider";
import { checkInCart } from "../../utils/checkInCart";
import { toast } from "react-toastify";

const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart !`);
  };

  return (
    <section className={styles.container}>
      <ul className={styles.productList}>
        {data.products.map((product) => (
          <li key={product.id} className={styles.product}>
            <div className={styles.productImg}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
              <p>{product.name}</p>
              <span>$ {product.price}</span>
              <button onClick={() => addProductHandler(product)}>
                {checkInCart(cart, product) ? "in cart" : "Add to cart"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomePage;

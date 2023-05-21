import * as data from "../../data";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { useCartActions, useCart } from "../../provider/CartProvider";
import { checkInCart } from "../../utils/checkInCart";
import { toast } from "react-toastify";
import { RiStarFill, RiStarHalfFill } from "react-icons/ri";

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
          <Link to={`/product/${product.id}`}>
            <li key={product.id} className={styles.product}>
              <div className={styles.productImg}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.productDesc}>
                <div className={styles.productInfo}>
                  <p>{product.name}</p>
                  <span>$ {product.price}</span>
                </div>
                <div className={styles.productRating}>
                  <div className={styles.productStars}>
                    <RiStarFill />
                    <RiStarFill />
                    <RiStarFill />
                    <RiStarFill />
                    <RiStarHalfFill />
                  </div>
                  <span>{"(130)"}</span>
                </div>
                <button
                  onClick={() => addProductHandler(product)}
                  className={styles.addBtn}
                >
                  {checkInCart(cart, product) ? "in cart" : "Add to cart"}
                </button>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default HomePage;

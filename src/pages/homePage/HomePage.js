import * as data from "../../data";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { useCartActions, useCart } from "../../provider/CartProvider";
import { checkInCart } from "../../utils/checkInCart";
import { toast } from "react-toastify";
import { RiStarFill, RiStarHalfFill } from "react-icons/ri";
import { BiCartAdd } from "react-icons/bi";

const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    dispatch({ type: "ADD_ONE_TO_CART", payload: product });
    toast.success(`${product.name} added to cart !`);
  };

  return (
    <section className={styles.container}>
      <ul className={styles.productList}>
        {data.products.map((product) => (
          <li key={product.id} className={styles.product}>
            <Link to={`/product/${product.id}`}>
              <div className={styles.productImg}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.productDesc}>
                <span className="grayText">Sneakers</span>
                <h3>{product.name}</h3>
                <div className={styles.priceBox}>
                  <span className={styles.price}>
                    $ {product.price.toFixed(2)}
                  </span>
                  <div className={styles.productRating}>
                    <RiStarFill />
                    <span className="grayText">4.9 | 320</span>
                  </div>
                </div>
              </div>
            </Link>
            <button
              onClick={() => addProductHandler(product)}
              className={styles.addToCartBtn}
            >
              <BiCartAdd />
              {/* {checkInCart(cart, product) ? "in cart" : <BiCartAdd/>} */}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomePage;

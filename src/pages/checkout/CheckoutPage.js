import styles from "./CheckoutPage.module.css";
import { useSearchParams, Link } from "react-router-dom";
import { getOneProduct } from "../../services/requestsServices";
import { useCart } from "../../provider/CartProvider";
import { useAuth } from "../../provider/AuthProvider";
import { useEffect, useState } from "react";
import { BiChevronLeftSquare } from "react-icons/bi";

const CheckoutPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product") || null;
  const quantity = searchParams.get("quantity") || 1;
  const { cart, total } = useCart();
  const userData = useAuth();

  useEffect(() => {
    if (productId) {
      getOneProduct(productId)
        .then((res) => {
          setProducts([res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProducts([...cart]);
    }
  }, []);

  return products.length ? (
    <div className={styles.mainContainer}>
      <h1>Checkout</h1>
      <Link to={-1} className={styles.link}>
        <BiChevronLeftSquare />
        {productId ? "go back" : "go back to cart"}
      </Link>
      <section>
        <div className={styles.infoSec}>
          <h3>User Information</h3>
          <p>Name : {userData.name}</p>
          <p>Email : {userData.email}</p>
        </div>
        <div className={styles.payment}>
          <ul>
            <li className={styles.titleSec}>
              <span>product</span>
              <span>quantity</span>
              <span>price</span>
            </li>
            {products.length &&
              products.map((product) => (
                <li>
                  <span>{product.name}</span>
                  <span>{productId ? quantity : product.quantity}</span>
                  <span>{product.offPrice}</span>
                </li>
              ))}
          </ul>
          <div className={styles.total}>
            <span>Total</span>
            <span>{productId ? products[0].offPrice * quantity : total}</span>
          </div>
          <button>Pay</button>
        </div>
      </section>
    </div>
  ) : (
    <p className="loading">Loading...</p>
  );
};

export default CheckoutPage;

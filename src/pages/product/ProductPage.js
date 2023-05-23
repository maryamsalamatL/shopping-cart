import { useParams } from "react-router-dom";
import { useCart, useCartActions } from "../../provider/CartProvider";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import http from "../../services/httpService";
import { RiStarFill, RiStarHalfFill, RiTruckLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { checkInCart } from "../../utils/checkInCart";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const { cart } = useCart();
  const { id } = useParams();
  console.log(product);
  useEffect(() => {
    http
      .get(`/product/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (product) {
      const InCartProduct = checkInCart(cart, product);
      InCartProduct ? setQuantity(InCartProduct.quantity) : setQuantity(0);
    }
    return;
  }, [product]);

  const decIncHandler = (type) => {
    let newQty = quantity;
    switch (type) {
      case "DEC": {
        newQty--;
        break;
      }
      case "INC": {
        newQty++;
        break;
      }
      default:
        return newQty;
    }

    setQuantity(newQty);
  };

  return (
    <main className={styles.main}>
      {product && (
        <section>
          <div className={styles.imgBox}>
            <img src={product.image} />
          </div>
          <div className={styles.description}>
            <h2>{product.name}</h2>
            <p className={styles.info}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className={styles.rating}>
              <div className={styles.ratingStars}>
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
                <RiStarHalfFill />
              </div>
              <span>{"(130)"}</span>
            </div>
            <span className={styles.hr}></span>
            <ul>
              {product.description.map((item) => (
                <li key={item._id}>{item.support}</li>
              ))}
            </ul>
            <span className={styles.hr}></span>
            <div className={styles.priceSec}>
              <span>${product.price.toFixed(2)}</span>
              <div className={styles.qtyBtnBox}>
                <button
                  className={
                    quantity === 0
                      ? `${styles.qtyBtnDisabled} ${styles.qtyBtn}`
                      : `${styles.qtyBtn}`
                  }
                  onClick={() => decIncHandler("DEC")}
                >
                  -
                </button>
                <p className={styles.qtyBtn}>{quantity}</p>
                <button
                  className={styles.qtyBtn}
                  onClick={() => decIncHandler("INC")}
                >
                  +
                </button>
              </div>
            </div>
            <BtnSec cart={cart} product={product} quantity={quantity} />

            <div className={styles.delivery}>
              <span className={styles.deliveryIcon}>
                <RiTruckLine />
              </span>
              <div style={{ padding: "0px 5px" }}>
                <p className={styles.deliveryTitle}>Delivery information</p>
                <span className="grayText">Lorem ipsum dolor sit amet </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;

const BtnSec = ({ cart, quantity, product }) => {
  const dispatch = useCartActions();

  const addProductHandler = (product) => {
    if (!quantity) {
      dispatch({
        type: "REMOVE_PRODUCT",
        payload: product,
      });
      toast.success(`${product.name} removed from the cart !`);
    } else {
      dispatch({
        type: "MULTIPLE_ADD_TO_CART",
        payload: product,
        qty: quantity,
      });
      toast.success(`${product.name} added to cart !`);
    }
  };

  return (
    <div className={styles.btnBox}>
      <button className={`${styles.btn} ${styles.buyBtn}`}>
        <Link to="/checkout">Buy Now</Link>
      </button>
      <button
        onClick={() => addProductHandler(product)}
        className={`${styles.btn} ${styles.addBtn} ${
          !quantity && !checkInCart(cart, product) && styles.disabled
        }`}
      >
        {checkInCart(cart, product) && quantity
          ? "update cart"
          : checkInCart(cart, product) && !quantity
          ? "Remove from cart"
          : "Add to cart"}
      </button>
    </div>
  );
};

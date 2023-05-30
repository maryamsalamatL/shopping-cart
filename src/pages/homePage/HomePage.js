import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { useCartActions } from "../../provider/CartProvider";
import { toast } from "react-toastify";
import { RiStarFill } from "react-icons/ri";
import { BiCartAdd } from "react-icons/bi";
import { useState, useEffect } from "react";
import Search from "../../common/Search";
import { getProducts } from "../../services/requestsServices";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useCartActions();

  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        setAllProducts(data);
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addProductHandler = (product) => {
    dispatch({ type: "ADD_ONE_TO_CART", payload: product });
    toast.success(`${product.name} added to cart !`);
  };

  const searchHandler = (e) => {
    const value = e.target.value;
    const filteredProducts = allProducts.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase().trim())
    );
    setProducts(filteredProducts);
  };

  return (
    <section className={styles.container}>
      <Search searchHandler={searchHandler} />
      <ul className={styles.productList}>
        {products.length ? (
          products.map((product) => (
            <li key={product._id} className={styles.product}>
              <Link to={`/product/${product._id}`}>
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
              </button>
            </li>
          ))
        ) : (
          <p className="loading">Loading...</p>
        )}
      </ul>
    </section>
  );
};

export default HomePage;

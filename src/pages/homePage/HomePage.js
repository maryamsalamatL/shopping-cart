import * as data from "../../data";
import styles from "./HomePage.module.css";
console.log(data.products);
const HomePage = () => {
  const addProductHandler = (product) => {
    console.log(product);
  };
  return (
    <section className={styles.container}>
      <ul className={styles.productList}>
        {data.products.map((product) => (
          <li className={styles.product}>
            <div className={styles.productImg}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
              <p>{product.name}</p>
              <span>$ {product.price}</span>
              <button onClick={() => addProductHandler(product)}>
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HomePage;

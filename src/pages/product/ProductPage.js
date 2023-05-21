import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import * as data from "../../data";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const findedProduct = data.products.find((p) => p.id === Number(id));
    setProduct(findedProduct);
  }, []);
  console.log(product);

  return (
    <main>
      {product && (
        <section>
          <div>
            <img src={product.image} />
          </div>
          <div>
            <h2>{product.name}</h2>
            <div>rating</div>
            <ul>
              {product.description.map((item) => (
                <li key={item.support}>{item.support}</li>
              ))}
            </ul>
            <div>
              <button>-</button>
              <p>1</p>
              <button>+</button>
            </div>
            <div>
              <button>Buy Now</button>
              <button>Add to Cart</button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductPage;

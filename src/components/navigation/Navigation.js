import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useCart } from "../../provider/CartProvider";

import { SiShopify } from "react-icons/si";
import { TbBrandShopee } from "react-icons/tb";
import { RiShoppingCart2Line, RiHome4Line } from "react-icons/ri";
import Search from "../../common/Search";

const Navigation = () => {
  const { cart } = useCart();

  return (
    <header className={styles.mainContainer}>
      <h2>
        <span>
          <SiShopify />
        </span>{" "}
        SALAMAT SHOP
      </h2>
      <Search styles={styles} />
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              <RiHome4Line />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.activeLink} ${styles.cartLink}`
                  : styles.cartLink
              }
            >
              <RiShoppingCart2Line />
              <span className={styles.badge}>{cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.profile}></div>
    </header>
  );
};

export default Navigation;

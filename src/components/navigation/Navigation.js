import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useCart } from "../../provider/CartProvider";

const Navigation = () => {
  const { cart } = useCart();

  return (
    <header className={styles.mainContainer}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Cart
              <span className={styles.badge}>{cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

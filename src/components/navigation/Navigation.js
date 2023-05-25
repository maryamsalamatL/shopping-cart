import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useCart } from "../../provider/CartProvider";
import { useAuth } from "../../provider/AuthProvider";
import { SiShopify } from "react-icons/si";
import { TbBrandShopee } from "react-icons/tb";
import { RiShoppingCart2Line, RiHome4Line } from "react-icons/ri";
import Search from "../../common/Search";

const Navigation = () => {
  const { cart } = useCart();
  const auth = useAuth();

  return (
    <header className={styles.mainContainer}>
      <div className={styles.title}>
        <h2>
          <span>
            <SiShopify />
          </span>{" "}
          SALAMAT SHOP
        </h2>
      </div>
      {/* <Search styles={styles} /> */}
      <div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
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
        <div className={styles.profile}>
          <Link to={auth ? "/profile" : "/login"}>
            {auth ? "profile" : "login/signup"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;

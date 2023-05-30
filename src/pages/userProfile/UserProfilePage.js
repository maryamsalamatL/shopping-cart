import { useAuth } from "../../provider/AuthProvider";
import styles from "./UserProfilePage.module.css";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const userData = useAuth();
  const render = () => {
    return userData ? (
      <div className={styles.mainContainer}>
        <h1>My Profile</h1>
        <div className={styles.profileSec}>
          <div className={styles.topSec}>
            <div className={styles.icon}>
              {userData.email.slice(0, 1).toUpperCase()}
            </div>
            <h4>{userData.name}</h4>
          </div>
          <div className={styles.info}>
            <h5>Information</h5>
            <ul>
              <li>
                <p>Email :</p>
                <span>{userData.email}</span>
              </li>

              <li>
                <p>Phone Number :</p>
                <span>{userData.phoneNumber}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <Link to="/login" className={styles.link}>
        Not login yet?
      </Link>
    );
  };
  return render();
};

export default UserProfilePage;

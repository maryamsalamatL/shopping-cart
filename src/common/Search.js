import { BiSearch } from "react-icons/bi";
import styles from "./Search.module.css";

const Search = ({ searchHandler }) => {
 
  const clickHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form className={styles.searchBox}>
      <input
        type="search"
        placeholder="Search product here ..."
        onChange={searchHandler}
      />

      <button className={styles.searchBtn} onClick={clickHandler}>
        <BiSearch />
      </button>
    </form>
  );
};

export default Search;

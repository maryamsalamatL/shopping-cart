import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const Search = ({ styles }) => {
  const [searchValue, setSearchValue] = useState("");

  const changeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form className={styles.searchBox}>
      <input
        type="search"
        placeholder="Search product here ..."
        onChange={changeHandler}
      />

      <button className={styles.searchBtn}>
        <BiSearch />
      </button>
    </form>
  );
};

export default Search;

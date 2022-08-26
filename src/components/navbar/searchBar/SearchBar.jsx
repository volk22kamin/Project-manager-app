import { useState } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const searchInputHandler = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
    props.onInput(event.target.value);
  };

  return (
    <div className={classes.container}>
      <form>
        <label htmlFor="">
          <input
            className={classes.searchBar}
            type="search"
            placeholder="Search for a project"
            onChange={searchInputHandler}
            value={searchInput}
          />
        </label>
      </form>
    </div>
  );
};

export default SearchBar;

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
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Find a Project"
          onChange={searchInputHandler}
          value={searchInput}
        />
      </div>
      <div className="control">
        <a className="button is-info">Search</a>
      </div>
    </div>
  );
};

export default SearchBar;

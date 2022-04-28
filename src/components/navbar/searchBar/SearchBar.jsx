import { useState } from "react";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const countries = [
    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },
  ];
  const [searchInput, setSearchInput] = useState("");

  const searchInputHandler = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };
  if (searchInput.length > 0) {
    const filtered = countries.filter((country) => {
      return country.continent === searchInput;
    });
  }

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

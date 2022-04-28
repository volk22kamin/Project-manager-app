import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <div>
      <form className={classes.searchBar}>
        <label htmlFor="">
          <input type="text" placeholder="Search for a project" />
        </label>
      </form>
    </div>
  );
};

export default SearchBar;

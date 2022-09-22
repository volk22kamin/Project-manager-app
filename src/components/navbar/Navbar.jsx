import { useState, useContext } from "react";
import AppContext from "../../context/Context";
import ProfileModal from "./profileModal/ProfileModal";
import classes from "./Navbar.module.css";
import logo from "../../logo.png";
import SearchBar from "./searchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import SearchSelect from "./searchSelect/SearchSelect";

// gets props from app
const Navbar = (props) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  console.log();
  const options = [
    { label: "hello", value: "hey" },
    { label: "sya", value: "bye" },
  ];

  const currentProject = context.currentProject;

  const onLogoClickHandler = () => {
    if (currentProject._id) {
      console.log(currentProject);
      navigate("project_overview");
    }
  };
  const onMyTaskClickHandler = () => {
    console.log("myTask clicked");
    navigate("myTasks");
  };

  const onProjectsClickHandler = () => {
    console.log("projects clicked");

    navigate("allProjects");
  };

  const onSearchHandler = (inputValue) => {
    console.log(inputValue);
  };

  const logOut = () => {
    props.logOut();
  };

  return (
    <nav
      className={`navbar ${classes.navbar}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${classes.logoContainer}`}
      >
        <img src={logo} />
        <div className="navbar-start">
          <a
            className="navbar-item has-text-white-ter	"
            onClick={onLogoClickHandler}
          >
            Home
          </a>

          {props.loggedIn && (
            <a
              className="navbar-item has-text-white-ter	"
              onClick={onMyTaskClickHandler}
            >
              My Tasks
            </a>
          )}
          {props.loggedIn && (
            <a
              className="navbar-item has-text-white-ter	"
              onClick={onProjectsClickHandler}
            >
              Projects
            </a>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item has-text-white-ter	">
            {props.loggedIn && <SearchBar onInput={onSearchHandler} />}
          </div>
          <div className="navbar-item has-text-white-ter	">
            {props.loggedIn && (
              <ProfileModal logOut={logOut}>Profile</ProfileModal>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

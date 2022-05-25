import { useState } from "react";

import ProfileModal from "./profileModal/ProfileModal";
import classes from "./Navbar.module.css";
import logo from "../../logo.png";
import SearchBar from "./searchBar/SearchBar";
import { useNavigate } from "react-router-dom";

// gets props from app
const Navbar = (props) => {
  const navigate = useNavigate();

  const onLogoClickHandler = () => {
    console.log("logo clicked");
    navigate("project_overview");
  };
  const onMyTaskClickHandler = () => {
    console.log("myTask clicked");
    navigate("myTasks");
  };

  const onProjectsClickHandler = () => {
    console.log("projects clicked");
    navigate("allProjects");
  };

  const logOut = () => {
    props.logOut();
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.logoContainer} onClick={onLogoClickHandler}>
        <img src={logo} alt="" />
        <h2 className={classes.logo}>Promger</h2>
      </div>
      {props.loggedIn && (
        <h2 className={classes.myTasks} onClick={onMyTaskClickHandler}>
          My tasks
        </h2>
      )}
      {props.loggedIn && (
        <h2 className={classes.projects} onClick={onProjectsClickHandler}>
          Projects
        </h2>
      )}
      {props.loggedIn && <SearchBar />}
      {props.loggedIn && <ProfileModal logOut={logOut}>Profile</ProfileModal>}
    </div>
  );
};

export default Navbar;

import { useState } from "react";

import ProfileIcon from "./profileIcon/ProfileIcon";
import classes from "./Navbar.module.css";
// for now dummy icon
import profileIcon from "../../testProfile.jpg";
import logo from "../../logo.png";
import SearchBar from "./searchBar/SearchBar";
import ProfilePage from "../pages/profilePage/ProfilePage";

// gets props from app
const Navbar = (props) => {
  const { name, email } = props.userInfo;
  const onLogoClickHandler = () => {
    console.log("logo clicked");
  };
  const onMyTaskClickHandler = () => {
    console.log("myTask clicked");
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.logoContainer} onClick={onLogoClickHandler}>
        <img src={logo} alt="" />
        <h2 className={classes.logo}>Promger</h2>
      </div>
      {props.loggedIn === true && (
        <h2 className={classes.myTasks} onClick={onMyTaskClickHandler}>
          My tasks
        </h2>
      )}
      {props.loggedIn && <SearchBar />}
      {props.loggedIn && (
        <ProfileIcon
          name={name}
          email={email}
          imageSrc={profileIcon}
          className={classes.profile}
        >
          Profile
        </ProfileIcon>
      )}
    </div>
  );
};

export default Navbar;

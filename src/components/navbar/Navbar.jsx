import ProfileIcon from "./profileIcon/ProfileIcon";
import classes from "./Navbar.module.css";
// for now dummy icon
import profileIcon from "../../testProfile.jpg";

const Navbar = (props) => {
  const onLogoClickHandler = () => {
    console.log("logo clicked");
  };

  return (
    <div className={classes.navbar}>
      <h2 className={classes.logo} onClick={onLogoClickHandler}>
        Project manager
      </h2>
      <a className={classes.myTasks} href="my tasks">
        My tasks
      </a>
      <h2 className={classes.searchBar}>Search</h2>
      <ProfileIcon imageSrc={profileIcon} className={classes.profile}>
        Profile
      </ProfileIcon>
    </div>
  );
};

export default Navbar;

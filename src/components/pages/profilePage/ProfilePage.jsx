import classes from "./ProfilePage.module.css";
import ProfilePageWrap from "./ProfilePageWrap";
import Button from "../../button/Button";
import Profile from "../../profile/Profile";
import AppContext from "../../../context/Context";
import { useContext } from "react";

const ProfilePage = (props) => {
  const context = useContext(AppContext);
  const onMyTasksClickHandler = () => {
    console.log("My Tasks clicked");
  };
  const onLogOutClickHandler = () => {
    console.log("Log out clicked");
    props.logOut();
  };
  const onCloseProfileHandler = () => {
    props.onCloseProfile();
  };
  return (
    <ProfilePageWrap onCloseProfile={onCloseProfileHandler}>
      <Profile name={context.userLogged.email} />
      <div className={classes.username}>{context.userLogged.name}</div>
      <div className={classes.email}>{context.userLogged.email}</div>
      <Button onClick={onMyTasksClickHandler}>My tasks</Button>
      <Button onClick={onLogOutClickHandler}>Log out</Button>
    </ProfilePageWrap>
  );
};

export default ProfilePage;

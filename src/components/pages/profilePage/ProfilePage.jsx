import classes from "./ProfilePage.module.css";
import classes2 from "../../navbar/profileIcon/ProfileIcon.module.css";
import ProfilePageWrap from "./ProfilePageWrap";
import ProfileIcon from "../../navbar/profileIcon/ProfileIcon";
import Button from "../../button/Button";

const ProfilePage = (props) => {
  const onMyTasksClickHandler = () => {
    console.log("My Tasks clicked");
  };
  const onLogOutClickHandler = () => {
    console.log("Log out clicked");
  };
  const onCloseProfileHandler = () => {
    props.onCloseProfile();
  };
  return (
    <ProfilePageWrap onCloseProfile={onCloseProfileHandler}>
      <img className={classes.profileImage} src={props.imageSrc} />
      <div className={classes.username}>{props.username}</div>
      <div className={classes.email}>{props.email}</div>
      <Button onClick={onMyTasksClickHandler}>My tasks</Button>
      <Button onClick={onLogOutClickHandler}>Log out</Button>
    </ProfilePageWrap>
  );
};

export default ProfilePage;

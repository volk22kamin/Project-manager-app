import classes from "./ProfileIcon.module.css";

const ProfileIcon = (props) => {
  const profileClickHandler = () => {
    console.log("profile clicked");
  };
  return (
    <div className={classes.profile}>
      <img
        onClick={profileClickHandler}
        className={classes.profileImage}
        src={props.imageSrc}
        alt="profile"
      />
    </div>
  );
};

export default ProfileIcon;

import classes from "./ProfileIcon.module.css";

const ProfileIcon = (props) => {
  return (
    <div className={classes.profile}>
      <img
        className={classes.profileImage}
        src={props.imageSrc}
        alt="profile"
      />
    </div>
  );
};

export default ProfileIcon;

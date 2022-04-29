import classes from "./ProfilePage.module.css";

// gets props from Profile

const ProfilePageWrap = (props) => {
  const handler = (event) => {
    console.log(event.target.className);
    if (event.target.className === "ProfilePage_overlay__5K2m-") {
      props.onCloseProfile();
    }
  };
  return (
    <div className={classes.overlay} onClick={handler}>
      <div className={classes.wrapBox}>{props.children}</div>;
    </div>
  );
};

export default ProfilePageWrap;

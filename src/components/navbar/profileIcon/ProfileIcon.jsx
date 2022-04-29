import classes from "./ProfileIcon.module.css";
import ProfilePage from "../../pages/profilePage/ProfilePage";
import logo from "../../../testProfile.jpg";
import { useState } from "react";

const ProfileIcon = (props) => {
  const [showProfile, setShowProfile] = useState(false);

  const profileClickHandler = () => {
    setShowProfile(true);
  };

  const onCloseProfileHandler = () => {
    setShowProfile(false);
  };

  return (
    <div>
      <div className={classes.profile}>
        <img
          onClick={profileClickHandler}
          className={classes.profileImage}
          src={props.imageSrc}
          alt="profile"
        />
      </div>
      {showProfile && (
        <ProfilePage
          onCloseProfile={onCloseProfileHandler}
          imageSrc={logo}
          username="mike"
          email="sdcds@"
        />
      )}
    </div>
  );
};

export default ProfileIcon;

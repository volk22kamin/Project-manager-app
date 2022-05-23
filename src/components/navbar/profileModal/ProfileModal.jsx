import classes from "./ProfileModal.module.css";
import ProfilePage from "../../pages/profilePage/ProfilePage";
import logo from "../../../testProfile.jpg";
import { useState, useEffect } from "react";

const ProfileModal = (props) => {
  const [showProfile, setShowProfile] = useState(false);

  const profileClickHandler = () => {
    if (showProfile === true) {
      return;
    }
    if (!showProfile) {
      setShowProfile(() => true);
    }
  };

  const onCloseProfileHandler = () => {
    setShowProfile(false);
  };

  const logOut = () => {
    props.logOut();
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
          logOut={logOut}
          onCloseProfile={onCloseProfileHandler}
          imageSrc={logo}
          username={props.name}
          email={props.email}
        />
      )}
    </div>
  );
};

export default ProfileModal;

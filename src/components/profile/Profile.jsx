import { Fragment } from "react";
import classes from "./Profile.module.css";

const Profile = (props) => {
  const colors = [
    "brown",
    "green",
    "yellow",
    "red",
    "grey",
    "black",
    "lightBlue",
    "chocolate",
  ];

  const color = colors[props.index];
  const shortName = props.name && props.name.substring(0, 2);

  return (
    <Fragment>
      <span
        onClick={() => props.onClick && props.onClick()}
        className={`${classes.profileCircle} ${classes[color]} ${
          props.isList && classes["box-shadow"]
        }`}
      >
        {shortName}
      </span>
    </Fragment>
  );
};

export default Profile;

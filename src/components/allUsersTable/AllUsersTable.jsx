import { Fragment, useState } from "react";
import Profile from "../profile/Profile";
import classes from "./AllUsersTable.module.css";

const AllUsersTable = (props) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Fragment>
      <div className={classes.wrapper}>
        {showAll
          ? props.usersList.map((name, index) => (
              <p key={index}>
                {<Profile index={index} name={name} isList={true} />}
              </p>
            ))
          : props.usersList
              .slice(0, 8)
              .map((name, index) => (
                <p key={index}>
                  {<Profile index={index} name={name} isList={true} />}
                </p>
              ))}
        {props.usersList.length > 8 && (
          <span
            onClick={() => setShowAll(!showAll)}
            className={classes["show-more"]}
          >
            {!showAll ? "Show more" : "Show less"}
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default AllUsersTable;

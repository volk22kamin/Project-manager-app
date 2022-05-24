import { Fragment } from "react";
import AllUsersTable from "../allUsersTable/AllUsersTable";
import classes from "./ProjectWrapper.module.css";

// gets props from app
const ProjectWrapper = (props) => {
  return (
    <Fragment>
      <div className={classes["project-desc"]}>
        <h2>{props.projectName}</h2>
        <AllUsersTable usersList={props.usersList}></AllUsersTable>
      </div>
      <div className={classes.wrap}>
        <div className={classes.projectWrapper}>{props.children}</div>
      </div>
    </Fragment>
  );
};

export default ProjectWrapper;

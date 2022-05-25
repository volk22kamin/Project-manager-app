import { Fragment } from "react";
import classes from "./TaskRow.module.css";

const TaskRow = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>{props.children}</div>
    </Fragment>
  );
};

export default TaskRow;

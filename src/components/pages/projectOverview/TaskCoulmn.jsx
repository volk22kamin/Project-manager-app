import classes from "./TaskColumn.module.css";

// gets props from app
const TaskColumn = (props) => {
  return (
    <div className={classes.column}>
      <header className={classes.header}>{props.header}</header>
      <div className={classes["column-body"]}></div>
    </div>
  );
};

export default TaskColumn;

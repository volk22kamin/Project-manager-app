import Profile from "../profile/Profile";
import Tag from "../tag/Tag";
import classes from "./Task.module.css";

// for now gets the props from taskColumn
const Task = (props) => {
  const onTaskClickHandler = () => {
    props.onUpdate(props.taskNumber, props.status);
  };

  return (
    <div
      onClick={props.onUpdate ? onTaskClickHandler : undefined}
      className={`${classes.taskContainer} ${classes[props.style]}`}
    >
      <p className={classes.text}>{props.taskText}</p>
      <footer className={classes.footer}>
        {/* <Tag>{props.taskNumber}</Tag> */}
        <Tag>{props.priority}</Tag>
        {props.isMyTasks && (
          <Tag isMyTasks={props.isMyTasks}>{props.status}</Tag>
        )}
        <Profile name={props.assignee} />
      </footer>
    </div>
  );
};

export default Task;

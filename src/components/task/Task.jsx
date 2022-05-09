import ProfileIcon from "../navbar/profileIcon/ProfileIcon";
import Tag from "../tag/Tag";
import classes from "./Task.module.css";

// for now gets the props from taskColumn
const Task = (props) => {
  // const status = props.status ?
  const onTaskClickHandler = () => {
    props.onUpdate(props.taskNumber, props.status);
  };

  return (
    <div
      onClick={props.onUpdate ? onTaskClickHandler : undefined}
      className={classes.taskContainer}
    >
      <p className={classes.text}>{props.taskText}</p>
      <footer className={classes.footer}>
        <Tag>{props.taskNumber}</Tag>
        <Tag>{props.priority}</Tag>
        <ProfileIcon imageSrc={props.imageSrc} />
      </footer>
    </div>
  );
};

export default Task;

import ProfileIcon from "../navbar/profileIcon/ProfileIcon";
import Tag from "../tag/Tag";
import classes from "./Task.module.css";
import Modal from "../modal/Modal";

// for now gets the props from taskColumn
const Task = (props) => {
  const onTaskClickHandler = () => {
    props.onUpdate(props.taskNumber);
  };

  return (
    <div
      onClick={props.onUpdate ? onTaskClickHandler : undefined}
      className={classes.taskContainer}
    >
      <p className={classes.text}>{props.taskText}</p>
      <footer className={classes.footer}>
        <Tag innerTag={props.taskNumber} />
        <ProfileIcon imageSrc={props.imageSrc} />
      </footer>
    </div>
  );
};

export default Task;

import ProfileIcon from "../navbar/profileIcon/ProfileIcon";
import Tag from "../tag/Tag";
import classes from "./Task.module.css";

// for now gets the props from taskColumn
const Task = (props) => {
  const onTaskClickHandler = () => {
    console.log(props.taskNumber);
    props.onUpdate(props.taskNumber);
  };

  return (
    <div onClick={onTaskClickHandler} className={classes.taskContainer}>
      <p className={classes.text}>{props.taskText}</p>
      <footer className={classes.footer}>
        <Tag innerTag={props.taskNumber} />
        <ProfileIcon imageSrc={props.imageSrc} />
      </footer>
    </div>
  );
};

export default Task;

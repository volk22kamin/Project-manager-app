import classes from "./TaskColumn.module.css";
import Task from "../../task/Task";
// gets props from app
const TaskColumn = (props) => {
  return (
    <div className={classes.column}>
      <header className={classes.header}>
        {props.tasks.length > 0
          ? `${props.header} ${props.tasks.length} issues`
          : props.header}
      </header>
      <div className={classes["column-body"]}>
        {props.tasks.map((task) => {
          return (
            <Task
              key={task.id}
              taskText={task.description}
              taskNumber={task.id}
              imageSrc={task.assignee}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskColumn;

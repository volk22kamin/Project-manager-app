import classes from "./TaskColumn.module.css";
import Task from "../../task/Task";
// gets props from app
const TaskColumn = (props) => {
  console.log("task column", props.tasks);
  const onTaskUpdateHandler = (id) => {
    props.onUpdate(id);
  };
  const createIssueHandler = () => {
    props.openCreateIssueModal();
  };
  return (
    <div className={classes.column}>
      <header className={classes.header}>
        {props.tasks.length > 0
          ? `${props.header} ${props.tasks.length} issues`
          : props.header}
        <button onClick={createIssueHandler}>+</button>
      </header>
      <div className={classes["column-body"]}>
        {props.tasks.map((task) => {
          return (
            <Task
              onUpdate={onTaskUpdateHandler}
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

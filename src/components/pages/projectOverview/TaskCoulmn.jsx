import classes from "./TaskColumn.module.css";
import Task from "../../task/Task";

// gets props from project overview
const TaskColumn = (props) => {
  const onTaskUpdateHandler = (id, status) => {
    props.onUpdate(id, status);
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
        {props.header === "To do" && (
          <button onClick={createIssueHandler}>+</button>
        )}
      </header>
      <div className={classes["column-body"]}>
        {props.tasks.map((task) => {
          return (
            <Task
              onUpdate={onTaskUpdateHandler}
              key={Math.random()}
              taskText={task.text}
              taskNumber={task.task_id}
              priority={task.priority}
              db_id={task._id}
              assignee={task.email}
              status={task.status}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskColumn;

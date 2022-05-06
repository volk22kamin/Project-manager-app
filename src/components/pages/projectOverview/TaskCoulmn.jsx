import classes from "./TaskColumn.module.css";
import Task from "../../task/Task";

let count = 1;
// gets props from project overview
const TaskColumn = (props) => {
  // console.log("task column props.tasks count", count++, props.tasks);
  // const data = useContext(TaskData);
  // console.log(data);

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
        {props.header === "To do" && (
          <button onClick={createIssueHandler}>+</button>
        )}
      </header>
      <div className={classes["column-body"]}>
        {props.tasks.map((task) => {
          return (
            // for now the moving task function
            // only passed to the to do column
            <Task
              onUpdate={props.header === "To do" && onTaskUpdateHandler}
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

import { Fragment, useContext, useEffect, useState } from "react";
import classes from "./MyTasksPage.module.css";
import { getTasksByEmail } from "../../../API/TaskAPIcalls";
import Task from "../../task/Task";
import BoxRow from "../../boxRow/BoxRow";
import AppContext from "../../../context/Context";

const MyTasksPage = (props) => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(AppContext);

  const getUsersTasks = async (email) => {
    const res = await getTasksByEmail(email);
    setTasks(res.data);
  };

  useEffect(() => {
    const email = context.userLogged && context.userLogged.email;
    getUsersTasks(email);
  }, []);

  // so depends on the sum of projects i have
  // i have to map task row, and inside them map task
  return (
    <Fragment>
      <h2 className={classes.title}>my tasks </h2>
      <div>
        <h2 className={classes.title}>project number 1</h2>
        <BoxRow>
          {tasks.map((task, index) => (
            <Task
              style={"third"}
              key={index}
              taskText={task.text}
              assignee={task.email}
              priority={task.priority}
              status={task.status}
              isMyTasks={true}
            />
          ))}
        </BoxRow>
        <h2 className={classes.title}>project number 2</h2>
        <BoxRow>
          {tasks.map((task, index) => (
            <Task
              style={"third"}
              key={index}
              taskText={task.text}
              assignee={task.email}
              priority={task.priority}
              status={task.status}
              isMyTasks={true}
            />
          ))}
        </BoxRow>
      </div>
    </Fragment>
  );
};

export default MyTasksPage;

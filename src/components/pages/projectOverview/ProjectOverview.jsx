import { useState, useContext, useEffect } from "react";
import { Fragment } from "react";
import cloneDeep from "lodash.clonedeep";
import TaskData from "../../../context/dummyDataContext";

import CreateIssue from "../../createIssue/CreateIssue";
import ProjectWrapper from "../../projectWrapper/ProjectWrapper";
import TaskColumn from "./TaskCoulmn";
import axios from "axios";

const ProjectOverview = () => {
  const allData = {
    todo: [],
    inProgress: [],
    codeReview: [],
    done: [],
  };

  const TaskDataCtx = useContext(TaskData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskArr, setTaskArr] = useState(allData);

  // for now not using, later will delete as state will be
  // managed eith taskArr and post and fetch API
  const [todoTasks, setTodoTasks] = useState([]);
  const [codeReview, setCodeReview] = useState(TaskDataCtx.codeReview);
  const [done, setDone] = useState(TaskDataCtx.done);
  const [inProgress, setInProgress] = useState(TaskDataCtx.inProgress);

  const filterToColumns = (data) => {
    const cloned = cloneDeep(taskArr);
    const filterTodo = data.filter((task) => task.status === "to do");
    const filterInProgress = data.filter(
      (task) => task.status === "in progress"
    );
    const filterCodeReview = data.filter(
      (task) => task.status === "code review"
    );
    const filterDone = data.filter((task) => task.status === "done");
    cloned.todo = filterTodo;
    cloned.inProgress = filterInProgress;
    cloned.codeReview = filterCodeReview;
    cloned.done = filterDone;

    setTaskArr(cloned);
  };

  const makeAPICall = async () => {
    try {
      const response = await fetch("http://localhost:3002/tasks");
      const data = await response.json();
      filterToColumns(data);
    } catch (e) {
      console.log("couldn't fetch ", e);
    }
  };

  // check why it is rendering twice
  // for now fetching by click
  // useEffect(() => {
  //   makeAPICall();
  // }, []);

  const onTaskUpdateHandler = (id) => {
    const taskToRemoveIndex = todoTasks.findIndex(
      (task) => task.task_id === id
    );
    if (taskToRemoveIndex >= 0) {
      const temp = inProgress;
      temp.push(todoTasks[taskToRemoveIndex]);
      setInProgress(() => temp);
      todoTasks.splice(taskToRemoveIndex, 1);
      const filtered = todoTasks.filter((task) => task.task_id !== id);
      setTodoTasks(filtered);
    }
  };

  const onCreateIssue = (task) => {
    console.log("project overview 23232 ", task, "12136415613");
    console.log(task.text);

    axios
      .post("http://localhost:3002/tasks", task)
      .then((response) => console.log(response, "response"))
      .catch((error) => console.log(error, "error"));

    console.log("data sent");
  };

  const onCloseModalHandler = () => {
    setModalIsOpen(false);
  };

  const openModalHandler = () => {
    setModalIsOpen(true);
  };
  return (
    <Fragment>
      <button onClick={makeAPICall}>fetch</button>
      {modalIsOpen && (
        <CreateIssue
          onCreateIssue={onCreateIssue}
          onCloseModal={onCloseModalHandler}
        />
      )}

      <ProjectWrapper projectName="Scooby Doo this shit">
        <TaskColumn
          onUpdate={onTaskUpdateHandler}
          openCreateIssueModal={openModalHandler}
          tasks={taskArr.todo}
          header="To do"
        />
        <TaskColumn tasks={taskArr.inProgress} header="In progress" />
        <TaskColumn tasks={taskArr.codeReview} header="Code review" />
        <TaskColumn tasks={taskArr.done} header="Done" />
      </ProjectWrapper>
    </Fragment>
  );
};

export default ProjectOverview;

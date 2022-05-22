import { useState, useEffect } from "react";
import { Fragment } from "react";
import cloneDeep from "lodash.clonedeep";
import axios from "axios";

import ProjectWrapper from "../../projectWrapper/ProjectWrapper";
import InputModal from "../../InputModal/InputModal";
import TaskColumnWrapper from "./TaskColumnWrapper";

let taskToChange = {};

const ProjectOverview = () => {
  const allData = {
    todo: [],
    inProgress: [],
    codeReview: [],
    done: [],
  };
  const [createIssueOpen, setCreateIssueOpen] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [taskArr, setTaskArr] = useState(allData);

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

  useEffect(() => {
    makeAPICall();
  }, [editTask, createIssueOpen]);

  const onTaskClickHandler = (id, status) => {
    const valuesTasks = Object.values(taskArr);
    valuesTasks.map((taskArrays) =>
      taskArrays.map((task) => {
        if (task.task_id === id) {
          taskToChange = task;
        }
      })
    );
    setEditTask(true);
  };

  const onCreateIssue = (task) => {
    axios
      .post("http://localhost:3002/tasks", task)
      .then((response) => {
        setCreateIssueOpen(false);
        // console.log(response, "response");
        console.log("data sent");
      })
      .catch((error) => console.log(error, "error occured"));
  };

  const onEditTask = (task) => {
    axios.put(`http://localhost:3002/tasks/ ${task.task_id}`, task);
    setEditTask(false);
  };

  const onDeleteTask = (task) => {
    axios
      .delete(`http://localhost:3002/tasks/ ${task.task_id}`)
      .then(() => console.log("task deleted"))
      .catch((error) => console.log(error, "error"));
  };

  const onCloseModalHandler = () => {
    setCreateIssueOpen(false);
  };

  const openModalHandler = () => {
    setCreateIssueOpen(true);
  };

  return (
    <Fragment>
      <button onClick={makeAPICall}>fetch</button>
      {createIssueOpen && (
        <InputModal
          okBtn="Submit"
          task_id={Date.now().valueOf()}
          onCreateIssue={onCreateIssue}
          onCloseModal={onCloseModalHandler}
          isEditMode={false}
        />
      )}
      {editTask && (
        <InputModal
          descValue={taskToChange.text}
          userSelected={taskToChange.email}
          prioritySelected={taskToChange.priority}
          okBtn="Save changes"
          task_id={taskToChange.task_id}
          status={taskToChange.status}
          onCreateIssue={onEditTask}
          onCloseModal={() => setEditTask(false)}
          delete={onDeleteTask}
          isEditMode={true}
        />
      )}

      <ProjectWrapper projectName="First project test">
        <TaskColumnWrapper
          onUpdate={onTaskClickHandler}
          openCreateIssueModal={openModalHandler}
          tasks={taskArr}
        />
      </ProjectWrapper>
    </Fragment>
  );
};

export default ProjectOverview;

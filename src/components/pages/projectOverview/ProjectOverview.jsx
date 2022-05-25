import { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import cloneDeep from "lodash.clonedeep";
import AppContext from "../../../context/Context";

import ProjectWrapper from "../../projectWrapper/ProjectWrapper";
import InputModal from "../../InputModal/InputModal";
import TaskColumnWrapper from "./TaskColumnWrapper";

import {
  getAllTasks,
  postTask,
  putEditTask,
  deleteTask,
} from "../../../API/TaskAPIcalls";

let taskToChange = {};

const ProjectOverview = () => {
  const context = useContext(AppContext);
  const emails = context.userEmails.map((user) => user.email);

  const allData = {
    todo: [],
    inProgress: [],
    codeReview: [],
    done: [],
  };
  const [createIssueOpen, setCreateIssueOpen] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [taskArr, setTaskArr] = useState(allData);

  const filterToColumns = (tasks) => {
    const cloned = cloneDeep(taskArr);
    const filterTodo = tasks.filter((task) => task.status === "to do");
    const filterInProgress = tasks.filter(
      (task) => task.status === "in progress"
    );
    const filterCodeReview = tasks.filter(
      (task) => task.status === "code review"
    );
    const filterDone = tasks.filter((task) => task.status === "done");
    cloned.todo = filterTodo;
    cloned.inProgress = filterInProgress;
    cloned.codeReview = filterCodeReview;
    cloned.done = filterDone;

    setTaskArr(cloned);
  };

  const getTasksFromAPI = async () => {
    const tasks = await getAllTasks();
    filterToColumns(tasks);
  };

  useEffect(() => {
    getTasksFromAPI();
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

  const onCreateIssue = async (task) => {
    const res = await postTask(task);
    if (res.code === "ERR_BAD_REQUEST") {
      console.log(res.response.data[0].message);
    }
    setCreateIssueOpen(false);
  };

  const onEditTask = async (task) => {
    const res = await putEditTask(task);
    if (res.code === "ERR_BAD_REQUEST") {
      console.log(res.response.data[0].message);
    }
    setEditTask(false);
  };

  const onDeleteTask = async (id) => {
    const res = await deleteTask(id);
  };

  const onCloseModalHandler = () => {
    setCreateIssueOpen(false);
  };

  const openModalHandler = () => {
    setCreateIssueOpen(true);
  };

  return (
    <Fragment>
      {createIssueOpen && (
        <InputModal
          usersList={emails}
          okBtn="Submit"
          task_id={Date.now().valueOf()}
          onCreateIssue={onCreateIssue}
          onCloseModal={onCloseModalHandler}
          isEditMode={false}
        />
      )}
      {editTask && (
        <InputModal
          usersList={emails}
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

      <ProjectWrapper usersList={emails} projectName="First project test">
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

import { useState, useEffect, useContext } from "react";
import { Fragment } from "react";
import cloneDeep from "lodash.clonedeep";
import AppContext from "../../../context/Context";

import ProjectWrapper from "../../projectWrapper/ProjectWrapper";
import InputModal from "../../InputModal/InputModal";
import TaskColumnWrapper from "./TaskColumnWrapper";

import {
  postTask,
  putEditTask,
  deleteTask,
  getAllProjectTasks,
} from "../../../API/TaskAPIcalls";
import { getOneUser } from "../../../API/UserAPIcalls";
import { updateProjectById } from "../../../API/ProjectAPIcalls";

let taskToChange = {};

const ProjectOverview = () => {
  const context = useContext(AppContext);
  const currentProject = context.currentProject;
  const emails = currentProject.users.map((user) => user.email);

  const allData = {
    todo: [],
    inProgress: [],
    codeReview: [],
    done: [],
  };
  const [users, setUsers] = useState(context.currentProject.users);
  const [taskArr, setTaskArr] = useState(allData);

  const [createIssueOpen, setCreateIssueOpen] = useState(false);
  const [editTask, setEditTask] = useState(false);

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

  const getTasksFromAPI = async (id) => {
    const tasks = await getAllProjectTasks(id);
    filterToColumns(tasks);
  };

  useEffect(() => {
    getTasksFromAPI(currentProject.id);
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

  const onAddUsertoProjectHandler = async (email) => {
    // add validating that the user is not currently in project
    const res = await getOneUser(email);
    const user = res.data;
    context.currentProject.users = [...context.currentProject.users, user];
    setUsers(context.currentProject.users);
    updateProjectById(context.currentProject);
  };

  const onDeleteUserFromProjHandler = async (user) => {
    console.log(user);
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
          task={taskToChange}
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

      <ProjectWrapper
        allUsers={context.userEmails}
        usersList={emails}
        currentProject={currentProject}
        addUser={onAddUsertoProjectHandler}
      >
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

import { useState, useContext } from "react";
import { Fragment } from "react";

import taskData from "../../../context/dummyDataContext";

import CreateIssue from "../../createIssue/CreateIssue";
import ProjectWrapper from "../../projectWrapper/ProjectWrapper";
import TaskColumn from "./TaskCoulmn";

const ProjectOverview = (props) => {
  const taskDataCtx = useContext(taskData);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // let inProgress = taskDataCtx.inProgress;
  const [todoTasks, setTodoTasks] = useState(taskDataCtx.todoTasks);
  const [codeReview, setCodeReview] = useState(taskDataCtx.codeReview);
  const [done, setDone] = useState(taskDataCtx.done);
  const [inProgress, setInProgress] = useState(taskDataCtx.inProgress);

  console.log("inporgreess", inProgress);
  console.log("inporgreess", codeReview);
  console.log("inporgreess", done);
  console.log("todo tasks", todoTasks);
  // console.log("inporgreess2", taskDataCtx.inProgress);

  const onTaskUpdateHandler = (id) => {
    console.log("pro", id);
    setInProgress(() => [
      ...inProgress,
      todoTasks[todoTasks.findIndex((task) => task.id === id)],
    ]);

    console.log(inProgress);
  };

  const onCloseModalHandler = () => {
    setModalIsOpen(false);
  };

  const openModalHandler = () => {
    setModalIsOpen(true);
  };
  return (
    <Fragment>
      {modalIsOpen && <CreateIssue onCloseModal={onCloseModalHandler} />}

      <ProjectWrapper projectName="Scooby Doo this shit">
        <TaskColumn
          onUpdate={onTaskUpdateHandler}
          openCreateIssueModal={openModalHandler}
          tasks={todoTasks}
          header="To do"
        />
        <TaskColumn tasks={inProgress} header="In progress" />
        <TaskColumn tasks={codeReview} header="Code review" />
        <TaskColumn tasks={done} header="Done" />
      </ProjectWrapper>
    </Fragment>
  );
};

export default ProjectOverview;

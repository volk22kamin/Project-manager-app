import { useState, useContext } from "react";
import { Fragment } from "react";

import TaskData from "../../../context/dummyDataContext";

import CreateIssue from "../../createIssue/CreateIssue";
import ProjectWrapper from "../../projectWrapper/ProjectWrapper";
import TaskColumn from "./TaskCoulmn";

const ProjectOverview = (props) => {
  const TaskDataCtx = useContext(TaskData);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [todoTasks, setTodoTasks] = useState(TaskDataCtx.todoTasks);
  const [codeReview, setCodeReview] = useState(TaskDataCtx.codeReview);
  const [done, setDone] = useState(TaskDataCtx.done);
  const [inProgress, setInProgress] = useState(TaskDataCtx.inProgress);

  // console.log("inporgreess2", TaskDataCtx.inProgress);

  const onTaskUpdateHandler = (id) => {
    setInProgress(() => [
      ...inProgress,
      todoTasks[todoTasks.findIndex((task) => task.id === id)],
    ]);
  };

  const onCreateIssue = (task) => {
    setTodoTasks(() => [...todoTasks, task]);
  };

  const onCloseModalHandler = () => {
    setModalIsOpen(false);
  };

  const openModalHandler = () => {
    setModalIsOpen(true);
  };
  return (
    <Fragment>
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

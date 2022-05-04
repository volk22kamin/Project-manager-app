import { split } from "lodash";
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

  const onTaskUpdateHandler = (id) => {
    const taskToRemoveIndex = todoTasks.findIndex((task) => task.id === id);
    if (taskToRemoveIndex >= 0) {
      const temp = inProgress;
      temp.push(todoTasks[taskToRemoveIndex]);
      setInProgress(() => temp);
      todoTasks.splice(taskToRemoveIndex, 1);
      const filtered = todoTasks.filter((task) => task.id !== id);
      setTodoTasks(filtered);
    }
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

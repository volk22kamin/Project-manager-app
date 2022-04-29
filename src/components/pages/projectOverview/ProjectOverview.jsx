import { useState } from "react";
import { Fragment } from "react";

import CreateIssue from "../../createIssue/CreateIssue";
import ProjectWrapper from "../../projectWrapper/ProjectWrapper";
import TaskColumn from "./TaskCoulmn";
const ProjectOverview = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          openCreateIssueModal={openModalHandler}
          tasks={props.todoTasks}
          header="To do"
        />
        <TaskColumn tasks={props.todoTasks} header="In progress" />
        <TaskColumn tasks={props.todoTasks} header="Code review" />
        <TaskColumn tasks={props.todoTasks} header="Done" />
      </ProjectWrapper>
    </Fragment>
  );
};

export default ProjectOverview;

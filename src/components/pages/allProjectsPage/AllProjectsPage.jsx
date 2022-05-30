import { Fragment, useEffect, useState } from "react";
import classes from "./AllProjectPage.module.css";
import { getAllProjects } from "../../../API/ProjectAPIcalls";
import BoxRow from "../../boxRow/BoxRow";
import ProjectPreviewBox from "./ProjectPreviewBox";
import Button from "../../button/Button";
import { createProject } from "../../../API/ProjectAPIcalls";
import Modal from "../../modal/Modal";

// fro now fetching all project
// need to fetch only projects that the
// user is assigned to them
const AllProjectPage = (props) => {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  const fetchAllProjects = async () => {
    const res = await getAllProjects();
    setProjects(res);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const onChangeINputHandler = (event) => {
    setProjectName(event.target.value);
  };

  const onCreateProjectHandler = (event) => {
    event.preventDefault();
    createProject(projectName);
    setOpenModal(false);
  };

  return (
    <Fragment>
      {openModal && (
        <Modal>
          <form onSubmit={onCreateProjectHandler}>
            <label htmlFor="projectName">project name</label>
            <input type="text" onChange={onChangeINputHandler} />
            <Button type="submit">Save</Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          </form>
        </Modal>
      )}
      <h2 className={classes.title}>My pojects:</h2>
      <Button onClick={() => setOpenModal(true)}>Add project</Button>
      <BoxRow>
        {projects.map((project, index) => (
          <ProjectPreviewBox
            key={index}
            projectId={project.id}
            name={project.name}
            proj={project}
          />
        ))}
      </BoxRow>
    </Fragment>
  );
};

export default AllProjectPage;

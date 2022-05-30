import { Fragment, useEffect, useState } from "react";
import classes from "./AllProjectPage.module.css";
import { getAllProjects } from "../../../API/ProjectAPIcalls";
import BoxRow from "../../boxRow/BoxRow";
import ProjectPreviewBox from "./ProjectPreviewBox";
import Button from "../../button/Button";

// fro now fetching all project
// need to fetch only projects that the
// user is assigned to them
const AllProjectPage = (props) => {
  const [projects, setProjects] = useState([]);
  const fetchAllProjects = async () => {
    const res = await getAllProjects();
    setProjects(res);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);
  return (
    <Fragment>
      <h2 className={classes.title}>My pojects:</h2>
      {/* <Button>Add project</Button> */}
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

import { Fragment, useState } from "react";
import classes from "./AllProjectPage.module.css";
import { getAllProjects } from "../../../API/ProjectAPIcalls";
import BoxRow from "../../boxRow/BoxRow";
import ProjectPreviewBox from "./ProjectPreviewBox";
import Button from "../../button/Button";

const AllProjectPage = (props) => {
  const [projects, setProjects] = useState([]);
  const fetchAllProjects = async () => {
    const res = await getAllProjects();
    setProjects(res);
  };

  return (
    <Fragment>
      <h2 className={classes.title}>hello</h2>
      <button onClick={fetchAllProjects}>fetch</button>
      {/* <Button>Add project</Button> */}
      <BoxRow>
        {projects.map((project, index) => (
          <ProjectPreviewBox
            key={index}
            projectId={project.id}
            name={project.name}
          />
        ))}
      </BoxRow>
    </Fragment>
  );
};

export default AllProjectPage;

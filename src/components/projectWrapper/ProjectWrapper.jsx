import classes from "./ProjectWrapper.module.css";

const ProjectWrapper = (props) => {
  return (
    <div>
      <h2>{props.projectName}</h2>
      <h2>participants...</h2>
      <div className={classes.projectWrapper}>{props.children}</div>
    </div>
  );
};

export default ProjectWrapper;

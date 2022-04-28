import classes from "./ProjectWrapper.module.css";

// gets props from app
const ProjectWrapper = (props) => {
  return (
    <div className={classes.wrap}>
      <div className={classes["project-desc"]}>
        <h2>{props.projectName}</h2>
        <h2>participants...</h2>
      </div>
      <div className={classes.projectWrapper}>{props.children}</div>
    </div>
  );
};

export default ProjectWrapper;

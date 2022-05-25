import classes from "./AllProjectPage.module.css";

const ProjectPreviewBox = (props) => {
  const onProjectClickHandler = () => {
    console.log("project clicked", props.projectId);
  };
  return (
    <div onClick={onProjectClickHandler} className={classes.container}>
      <h2 className={classes.header}>Project number {props.projectId}</h2>
      <h2>{props.name}</h2>
    </div>
  );
};

export default ProjectPreviewBox;

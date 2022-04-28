import classes from "./Tag.module.css";

const Tag = (props) => {
  return <p className={classes.tag}>{props.innerTag}</p>;
};

export default Tag;

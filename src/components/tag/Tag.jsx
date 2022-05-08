import classes from "./Tag.module.css";

const Tag = (props) => {
  return (
    <p
      className={
        !isNaN(props.innerTag)
          ? classes.tag
          : classes[`priority-${props.innerTag}`]
      }
    >
      {props.innerTag}
    </p>
  );
};

export default Tag;

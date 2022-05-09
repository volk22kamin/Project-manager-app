import classes from "./Tag.module.css";

// gets props from testModal
const Tag = (props) => {
  return (
    <p
      className={
        isNaN(props.children)
          ? classes[`priority-${props.children}`]
          : classes.tag
      }
    >
      {props.children}
    </p>
  );
};

export default Tag;

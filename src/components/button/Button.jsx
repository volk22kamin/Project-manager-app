import classes from "./Button.module.css";

const Button = (props) => {
  return (
    // onClick temp name
    <button className={classes.card} onClick={props.onClick}>
      {props.innerText}
    </button>
  );
};

export default Button;

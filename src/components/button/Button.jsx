import classes from "./Button.module.css";

const Button = (props) => {
  return (
    // onClick temp name
    <button type={props.type} className={classes.card} onClick={props.onClick}>
      {props.innerText}
    </button>
  );
};

export default Button;

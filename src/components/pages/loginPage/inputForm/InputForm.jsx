import Button from "../../../button/Button";
import classes from "./InputForm.module.css";
import InputWrap from "./InputWrap";

const InputForm = (props) => {
  return (
    <InputWrap>
      <form>
        <div className={classes.inputForm}>
          {props.name && (
            <div className={classes.item}>
              <label>Full name</label>
              <input type="text" name="fullName" id="fullName" />
            </div>
          )}
          <div className={classes.item}>
            <label>E-mail</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className={classes.item}>
            <label>Password</label>
            <input type="password" name="password" id="password" />
          </div>
          {props.confirm && (
            <div className={classes.item}>
              <label>Confirm Password</label>
              <input type="password" name="confirm" id="confirm" />
            </div>
          )}
        </div>
        <div className={classes.btn}>
          <Button type="submit" innerText={props.action} />
        </div>
        {/* <input type="submit" value={props.action} /> */}
      </form>
    </InputWrap>
  );
};

export default InputForm;

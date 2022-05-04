import Button from "../../../button/Button";
import classes from "./InputForm.module.css";
import InputWrap from "./InputWrap";
import { useRef } from "react";

const InputForm = (props) => {
  const refEmail = useRef("");
  const refname = useRef("");
  const refconfirm = useRef("");
  const refpassword = useRef("");

  const validateConfirmPassword = () => {
    if (!refconfirm.current.value) return true;
    return refpassword.current.value === refconfirm.current.value;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!validateConfirmPassword()) {
      console.log("not the same");
      return;
    }
    const loginData = {
      email: refEmail.current.value,
      name: refname.current.value ? refname.current.value : "",
      password: refpassword.current.value,
      confirm: refconfirm.current.value ? refconfirm.current.value : "",
    };
    props.onLogin(loginData);
  };

  return (
    <InputWrap>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.inputForm}>
          {props.name && (
            <div className={classes.item}>
              <label className={classes.label}>
                Full name
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  ref={refname}
                  required
                />
              </label>
            </div>
          )}
          <div className={classes.item}>
            <label className={classes.label}>
              E-mail
              <input
                type="email"
                name="email"
                id="email"
                ref={refEmail}
                required
                value={"vel@gmail.com"}
              />
            </label>
          </div>
          <div className={classes.item}>
            <label className={classes.label}>
              Password
              <input
                type="password"
                name="password"
                id="password"
                ref={refpassword}
                required
                value={"hsdlbkvhbdl"}
              />
            </label>
          </div>
          {props.confirm && (
            <div className={classes.item}>
              <label className={classes.label}>
                Confirm Password
                <input
                  type="password"
                  name="confirm"
                  id="confirm"
                  ref={refconfirm}
                  required
                />
              </label>
            </div>
          )}
        </div>
        <div className={classes.btn}>
          <Button type="submit" innerText={props.action} />
        </div>
      </form>
    </InputWrap>
  );
};

export default InputForm;

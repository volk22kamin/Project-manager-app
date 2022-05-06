import Button from "../../../button/Button";
import classes from "./InputForm.module.css";
import InputWrap from "./InputWrap";
import { useRef, useState } from "react";

const InputForm = (props) => {
  const refEmail = useRef("vel@gmail.com");
  const refname = useRef("");
  const refconfirm = useRef("");
  const refpassword = useRef("12315ds");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  // const userNameChangeHandler = (event) => {
  //   setUserName(event.target.value);
  // };
  // const emailChangeHandler = (event) => {
  //   setEmail(event.target.value);
  // };
  // const passwordChangeHandler = (event) => {
  //   setPassword(event.target.value);
  // };
  // const confirmChangeHandler = (event) => {
  //   setConfirm(event.target.value);
  // };

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
              <label htmlFor="fullname" className={classes.label}>
                Full name
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  ref={refname}
                  required
                  // onChange={userNameChangeHandler}
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
                // onChange={emailChangeHandler}
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
                value={"hgsdvks"}
                // onChange={passwordChangeHandler}
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
          <Button type="submit">{props.action}</Button>
        </div>
      </form>
    </InputWrap>
  );
};

export default InputForm;

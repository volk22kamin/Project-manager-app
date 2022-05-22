import { useNavigate } from "react-router-dom";
import Card from "../../card/Card";
import InputForm from "./inputForm/InputForm";
import classes from "./inputForm/InputForm.module.css";
import { loginHandler, registerHandler } from "../../../API/UserAPIcalls";
import { useEffect } from "react";

// gets props from app
const LoginPage = (props) => {
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    const response = await registerHandler(user);
    console.log("status", response.status);
    console.log("token", response.token);
    // if (status === 200) {
    //   navigate("/project_overview");
    //   props.onLogin();
    // }
    console.log(response);
  };

  // useEffect(() => {
  //   if (props.isLoggedIn) {
  //     console.log("is logged in", props.isLoggedIn);
  //     navigate("/project_overview");
  //   }
  //   console.log(props.isLoggedIn);
  // }, []);

  const onLoginHandler = async (userDetails) => {
    const response = await loginHandler(userDetails);
    const token = response.data;
    if (response.status === "ok") {
      localStorage.setItem("token-promger", token);
      navigate("/project_overview");
      props.onLogin();
    } else if (response.status === "error") {
      console.log(response);
    }
  };

  return (
    <div className={classes.page}>
      <Card>
        <InputForm
          onLogin={onRegisterHandler}
          register={true}
          actionName="Register"
        />
      </Card>
      <div className={classes.divider}></div>
      <Card>
        <InputForm onLogin={onLoginHandler} actionName="Log-in" />
      </Card>
    </div>
  );
};

export default LoginPage;

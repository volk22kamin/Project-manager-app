import { useNavigate } from "react-router-dom";
import Card from "../../card/Card";
import InputForm from "./inputForm/InputForm";
import classes from "./inputForm/InputForm.module.css";

// gets props from app
const LoginPage = (props) => {
  const navigate = useNavigate();

  const onLoginHandler = (userDetails) => {
    navigate("/project_overview");
    props.onLogin(userDetails);
  };

  return (
    <div className={classes.page}>
      <Card>
        <InputForm
          onLogin={onLoginHandler}
          name={" "}
          confirm={" "}
          action="Register"
        />
      </Card>
      <div className={classes.divider}></div>
      <Card>
        <InputForm onLogin={onLoginHandler} action="Log-in" />
      </Card>
    </div>
  );
};

export default LoginPage;

import Card from "../../card/Card";
import InputForm from "./inputForm/InputForm";
import classes from "./inputForm/InputForm.module.css";

const LoginPage = (props) => {
  return (
    <div className={classes.page}>
      <Card>
        <InputForm name={"s"} confirm={"s"} action="Register" />
      </Card>
      <Card>
        <InputForm action="Log-in" />
      </Card>
    </div>
  );
};

export default LoginPage;

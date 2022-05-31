import Card from "../../card/Card";
import InputForm from "./inputForm/InputForm";
import classes from "./inputForm/InputForm.module.css";
import { loginHandler, registerHandler } from "../../../API/UserAPIcalls";
import { useState } from "react";

import ErrorModal from "../../errorModal/ErrorModal";

let errorMsg = "";
// gets props from app
const LoginPage = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onRegisterHandler = async (user) => {
    // add error handling
    const response = await registerHandler(user);
    localStorage.setItem("token-promger", response.token);
    props.loginOnToken(response.isNew);
  };

  const onLoginHandler = async (userDetails) => {
    const response = await loginHandler(userDetails);
    const data = response.data.data;
    if (response.data.status === "ok") {
      localStorage.setItem("token-promger", data);
      props.loginOnToken(response.isNew);
    } else if (response.data.status === "error") {
      errorMsg = data;
      setModalOpen(true);
    }
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen ? (
        <ErrorModal
          errorMsg={errorMsg}
          onCloseModal={onCloseModal}
        ></ErrorModal>
      ) : null}
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
    </div>
  );
};

export default LoginPage;

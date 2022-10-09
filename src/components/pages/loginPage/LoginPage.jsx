import Card from "../../card/Card";
import InputForm from "./inputForm/InputForm";
import classes from "./inputForm/InputForm.module.css";
import {
  loginHandler,
  registerHandler,
  signInWithGoogle,
} from "../../../API/UserAPIcalls";
import { useState } from "react";

import { GoogleLogin } from "react-google-login";

import ErrorModal from "../../errorModal/ErrorModal";

let errorMsg = "";
// gets props from app
const LoginPage = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onRegisterHandler = async (user) => {
    // add error handling
    const response = await registerHandler(user);
    localStorage.setItem("token-promger", response.token);
    props.loginOnToken(response.isNew, "local");
  };

  const onLoginHandler = async (userDetails) => {
    const response = await loginHandler(userDetails);
    const data = response.data.data;
    if (response.data.status === "ok") {
      localStorage.setItem("token-promger", data);
      props.loginOnToken(response.isNew, "local");
    } else if (response.data.status === "error") {
      errorMsg = data;
      setModalOpen(true);
    }
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const clientId = process.env.REACT_APP_CLIENT_ID;

  const onSuccess = async (res) => {
    console.log("succes");
    const user = {
      name: res.profileObj.name,
      googleId: res.profileObj.googleId,
      email: res.profileObj.email,
    };

    const response = await signInWithGoogle(user);

    localStorage.setItem("token-promger", response.data);
    props.loginOnToken(response.isNew, "google");
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <div>
      {modalOpen ? (
        <ErrorModal
          errorMsg={errorMsg}
          onCloseModal={onCloseModal}
        ></ErrorModal>
      ) : null}
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
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

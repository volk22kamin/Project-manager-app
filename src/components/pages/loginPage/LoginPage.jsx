import Card from "../../card/Card";
import InputForm from "./inputForm/InputForm";
import classes from "./inputForm/InputForm.module.css";
import { loginHandler, registerHandler } from "../../../API/UserAPIcalls";
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
    props.loginOnToken(response.isNew);
  };

  const clientId =
    "567536629255-mqr6h5pkbr3olvugariv2ckpf32tfgif.apps.googleusercontent.com";

  const onSuccess = (res) => {
    console.log("success:", res);
    props.googleLogin();
  };
  const onFailure = (err) => {
    console.log("failed:", err);
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
      <div className={classes.googleLogin}>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
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

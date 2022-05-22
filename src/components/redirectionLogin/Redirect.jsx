import { Fragment } from "react";
import { Route } from "react-router-dom";
import LoginPage from "../pages/loginPage/LoginPage";
import ProjectOverview from "../pages/projectOverview/ProjectOverview";

const Redirect = (props) => {
  return (
    <Route>
      {props.isLoggedIn ? (
        <LoginPage
          isLoggedIn={props.isLoggedIn}
          onLogin={props.onLogInHandler}
        />
      ) : (
        <ProjectOverview />
      )}
    </Route>
  );
};

export default Redirect;

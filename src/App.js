import { useEffect, useState, Fragment, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  verifyToken,
  getAllEmails,
  verifyTokenWithGoogle,
} from "./API/UserAPIcalls";
import AppContext from "./context/Context";

import LoginPage from "./components/pages/loginPage/LoginPage";
import Navbar from "./components/navbar/Navbar";
import ProjectOverview from "./components/pages/projectOverview/ProjectOverview";

import "./App.css";
import WelcomePage from "./components/pages/welcomePage/WelcomePage";
import MyTasksPage from "./components/pages/myTasksPage/MyTasksPage";
import AllProjectPage from "./components/pages/allProjectsPage/AllProjectsPage";
import { gapi } from "gapi-script";

let userInfo = {};

function App() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [isLoggedIn, setIsLoggenIn] = useState(false);

  const clientId = process.env.REACT_APP_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({ clientId: clientId });
      gapi.load("client:auth2", initClient);
    };
  });

  const loginOnToken = async (isNew, userType) => {
    const token = localStorage.getItem("token-promger");

    if (token) {
      let response;

      if (userType === "google") {
        response = await verifyTokenWithGoogle(token);
      } else if (userType === "local") {
        response = await verifyToken(token);
      } else {
        return;
      }

      userInfo = response.data;
      userInfo.isNew = isNew;
      setIsLoggenIn(true);
      context.userLogged = userInfo;
      console.log(context.userLogged);
      navigate("welcome");
      const timer = setTimeout(() => {
        navigate("allProjects");
      }, 800);
      return () => clearTimeout(timer);
    } else {
      console.log("token not available");
    }
  };

  useEffect(() => {
    loginOnToken(false, "");
  }, []);

  const onLogOutHandler = () => {
    localStorage.removeItem("token-promger");
    setIsLoggenIn(false);
    navigate("/");
  };

  const onLogInHandler = () => {
    setIsLoggenIn(true);
  };

  const saveAllEmails = async () => {
    context.userEmails = await getAllEmails();
  };
  if (isLoggedIn) {
    saveAllEmails();
  }

  return (
    <Fragment>
      <AppContext.Provider value={context}>
        <Navbar
          logOut={onLogOutHandler}
          userInfo={userInfo}
          loggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            index
            element={
              <LoginPage
                loginOnToken={loginOnToken}
                isLoggedIn={isLoggedIn}
                onLogin={onLogInHandler}
              />
            }
          />
          <Route
            path="welcome"
            element={
              <WelcomePage name={userInfo.name} isNew={userInfo.isNew} />
            }
          />
          <Route
            path="project_overview"
            element={isLoggedIn && <ProjectOverview />}
          />
          <Route path="myTasks" element={isLoggedIn && <MyTasksPage />} />
          <Route path="allProjects" element={<AllProjectPage />} />
        </Routes>
      </AppContext.Provider>
    </Fragment>
  );
}

export default App;

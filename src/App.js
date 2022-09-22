import { useEffect, useState, Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { verifyToken, getAllEmails } from "./API/UserAPIcalls";
import AppContext from "./context/Context";

import { gapi } from "gapi-script";

import LoginPage from "./components/pages/loginPage/LoginPage";
import Navbar from "./components/navbar/Navbar";
import ProjectOverview from "./components/pages/projectOverview/ProjectOverview";

import "./App.css";
import WelcomePage from "./components/pages/welcomePage/WelcomePage";
import MyTasksPage from "./components/pages/myTasksPage/MyTasksPage";
import AllProjectPage from "./components/pages/allProjectsPage/AllProjectsPage";

let userInfo = {};

function App() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [isLoggedIn, setIsLoggenIn] = useState(false);
  const clientId =
    "567536629255-mqr6h5pkbr3olvugariv2ckpf32tfgif.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const loginOnToken = async (isNew) => {
    const token = localStorage.getItem("token-promger");
    if (token) {
      const response = await verifyToken(token);
      userInfo = response.data;
      userInfo.isNew = isNew;
      setIsLoggenIn(true);
      context.userLogged = userInfo;
      navigate("welcome");
      const timer = setTimeout(() => {
        navigate("allProjects");
      }, 800);
      return () => clearTimeout(timer);
    } else {
      console.log("token not available");
    }
  };

  const loginOnGoogle = () => {
    setIsLoggenIn(true);
    navigate("welcome");

    const timer = setTimeout(() => {
      navigate("allProjects");
    }, 800);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    loginOnToken(false);
  }, []);

  const onLogOutHandler = () => {
    localStorage.removeItem(
      "oauth2_ss::http://localhost:3000::1::DEFAULT::_ss_"
    );
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
                googleLogin={loginOnGoogle}
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

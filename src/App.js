import { useEffect, useState, Fragment, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { verifyToken, getAllEmails } from "./API/UserAPIcalls";
import AppContext from "./context/Context";

import LoginPage from "./components/pages/loginPage/LoginPage";
import Navbar from "./components/navbar/Navbar";
import ProjectOverview from "./components/pages/projectOverview/ProjectOverview";

import "./App.css";
import WelcomePage from "./components/pages/welcomePage/WelcomePage";

let userInfo = {};

// in first log in
// the user info doesnot show in profile modal
// until refreshing, also when changing user until
// refresh still shows the old user

// could be solved!?

function App() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [isLoggedIn, setIsLoggenIn] = useState(false);

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
        navigate("project_overview");
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      console.log("token not available");
    }
  };

  useEffect(() => {
    loginOnToken();
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
          <Route path="project_overview" element={<ProjectOverview />} />
        </Routes>
      </AppContext.Provider>
    </Fragment>
  );
}

export default App;

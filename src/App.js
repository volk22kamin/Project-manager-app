import { useEffect, useState, Fragment } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { verifyToken } from "./API/UserAPIcalls";

import LoginPage from "./components/pages/loginPage/LoginPage";
import Navbar from "./components/navbar/Navbar";
import ProjectOverview from "./components/pages/projectOverview/ProjectOverview";

import "./App.css";

let userInfo = {};

// in first log in
// the user info doesnot show in profile modal
// until refreshing

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggenIn] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token-promger");
      if (token) {
        const response = await verifyToken(token);
        userInfo = response.data;
        setIsLoggenIn(true);
        navigate("project_overview");
      } else {
        console.log("token not available");
      }
    };
    verify();
  }, []);

  const onLogInHandler = () => {
    setIsLoggenIn(true);
  };

  return (
    <Fragment>
      <Navbar userInfo={userInfo} loggedIn={isLoggedIn} />
      <Routes>
        <Route
          // path="/signin"
          index
          element={
            <LoginPage isLoggedIn={isLoggedIn} onLogin={onLogInHandler} />
          }
        />
        <Route path="project_overview" element={<ProjectOverview />} />
      </Routes>
    </Fragment>
  );
}

export default App;

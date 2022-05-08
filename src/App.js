import { useState } from "react";
import { Fragment } from "react";
import LoginPage from "./components/pages/loginPage/LoginPage";
import Navbar from "./components/navbar/Navbar";
import ProjectOverview from "./components/pages/projectOverview/ProjectOverview";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggenIn] = useState(false);
  // const navigate = useNavigate();

  const onLogInHandler = (userDetails) => {
    console.log("app re-render");
    setIsLoggenIn(true);
    console.log(userDetails, "app  ");
  };

  return (
    <Fragment>
      <Navbar loggedIn={isLoggedIn} />
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage onLogin={onLogInHandler} />} />
          <Route path="project_overview" element={<ProjectOverview />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

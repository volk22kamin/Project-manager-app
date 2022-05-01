import { useContext, useState } from "react";
import { Fragment } from "react";
import LoginPage from "./components/pages/loginPage/LoginPage";
import Navbar from "./components/navbar/Navbar";
import ProjectOverview from "./components/pages/projectOverview/ProjectOverview";

import "./App.css";
import TaskData from "./context/dummyDataContext";

function App() {
  const [isLoggedIn, setIsLoggenIn] = useState(false);

  return (
    <Fragment>
      {/* <LoginPage /> */}
      {!isLoggedIn && (
        <div>
          <Navbar />
          <ProjectOverview />
        </div>
      )}
    </Fragment>
  );
}

export default App;

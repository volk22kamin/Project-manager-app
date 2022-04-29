import TaskColumn from "./components/pages/projectOverview/TaskCoulmn";
import ProjectWrapper from "./components/projectWrapper/ProjectWrapper";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./components/pages/loginPage/LoginPage";
import CreateIssue from "./components/createIssue/CreateIssue";

import "./App.css";

import logo from "./testProfile.jpg";
import { Fragment } from "react";
import { useState } from "react";
import ProjectOverview from "./components/pages/projectOverview/ProjectOverview";

function App() {
  const [isLoggedIn, setIsLoggenIn] = useState(false);


  const todoTasks = [
    {
      id: 1,
      description: "make the navbar",
      assignee: logo,
    },
    {
      id: 2,
      description: "make Profile page",
      assignee: logo,
    },
    {
      id: 3,
      description: "make Button component",
      assignee: logo,
    },
  ];

  return (
    <Fragment>
      {/* <LoginPage /> */}
      {!isLoggedIn && (
        <div>
          <Navbar />
          <ProjectOverview todoTasks={todoTasks} />

        </div>
      )}
    </Fragment>
  );
}

export default App;

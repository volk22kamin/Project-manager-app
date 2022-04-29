import TaskColumn from "./components/pages/projectOverview/TaskCoulmn";
import ProjectWrapper from "./components/projectWrapper/ProjectWrapper";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { Fragment } from "react";

import logo from "./testProfile.jpg";
import { useState } from "react";
import LoginPage from "./components/pages/loginPage/LoginPage";
import ProfilePage from "./components/pages/profilePage/ProfilePage";

function App() {
  const [isLoggedIn, setIsLoggenIn] = useState(false);
  // const [isProfileClicked, setProfilePopUp] = useState(false);
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
      {/* <ProfilePage trigger = {isProfileClicked} username = "Mike" email = "mike@gmail.com" imageSrc ={logo}/> */}
      <LoginPage  />
      {isLoggedIn && (
        <div>
          <Navbar/>
          <ProjectWrapper projectName="Scooby Doo this shit">
            <TaskColumn tasks={todoTasks} header="To do" />
            <TaskColumn tasks={todoTasks} header="In progress" />
            <TaskColumn tasks={todoTasks} header="Code review" />
            <TaskColumn tasks={todoTasks} header="Done" />
          </ProjectWrapper>
        </div>
      )}
    </Fragment>
  );
}

export default App;

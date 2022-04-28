import TaskColumn from "./components/pages/projectOverview/TaskCoulmn";
import ProjectWrapper from "./components/projectWrapper/ProjectWrapper";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { Fragment } from "react";
import SearchBar from "./components/navbar/searchBar/SearchBar";

function App() {
  return (
    <Fragment>
      <SearchBar />
      <Navbar />
      <ProjectWrapper projectName="project a">
        <TaskColumn header="To do" />
        <TaskColumn header="In progress" />
        <TaskColumn header="Code review" />
        <TaskColumn header="Done" />
      </ProjectWrapper>
    </Fragment>
  );
}

export default App;

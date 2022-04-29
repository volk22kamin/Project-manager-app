import React from "react";
import logo from "../testProfile.jpg";

const taskData = React.createContext({
  todoTasks: [
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
  ],
  inProgress: [
    {
      id: 4,
      description: "make profile component",
      assignee: logo,
    },
  ],
  codeReview: [],
  done: [],
});

export default taskData;

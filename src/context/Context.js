import React from "react";

const AppContext = React.createContext({
  userEmails: [],
  userLogged: null,
});

export default AppContext;

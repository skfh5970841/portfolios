import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Login from "./routes/Login";
import Data from "./routes/Data";
import Detail from "./routes/Detail";
import Index from "./routes/Index";
import Edit from "./routes/Edit";
import AddData from "./routes/AddData";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Index} />
      <Route path="/login" component={Login} />
      <Route path="/data" exact={true} component={Data} />
      <Route path="/data-details/:id" exact={true} component={Detail} />
      <Route path="/edit-data/:id" component={Edit} />
      <Route path="/add-data/" component={AddData} />
    </HashRouter>
  );
}

export default App;

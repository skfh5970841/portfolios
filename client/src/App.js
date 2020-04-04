import React, { useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Login from "./routes/Login";
import Data from "./routes/Data";
import Detail from "./routes/Detail";
import Index from "./routes/Index";
import Edit from "./routes/Edit";
import AddData from "./routes/AddData";
import { actionCreators } from "./store";
import { connect } from "react-redux";
import Delete from "./routes/Delete";

const App = ({login}) => {
  useEffect(()=>{
    login(localStorage.getItem("isLogined"));
  }, []);
  return (
      <HashRouter>
        <Navigation />
        <Route path="/" exact={true} component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/data" exact={true} component={Data} />
        <Route path="/data-details/:id" exact={true} component={Detail} />
        <Route path="/edit-data/:id" component={Edit} />
        <Route path="/add-data/" component={AddData} />
        <Route path="/delete/:id" component={Delete}/>
      </HashRouter>
  );
}

function mapStateToProps(state, ownProps) {
  localStorage.setItem("isLogined", state);
  return { isLogined : state };
}

function mapDispachToProps(dispach, ownProps){
  return {
      login: (isLogined) => dispach(actionCreators.login(isLogined))
  };
}


export default connect(mapStateToProps, mapDispachToProps)(App);
//export default App;

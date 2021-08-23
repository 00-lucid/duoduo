import "./App.css";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Root from "./pages/Root";
import Signin from "./pages/Signin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Root}></Route>
        <Route path="/signin" exact component={Signin}></Route>
      </Switch>
    </div>
  );
}

export default App;

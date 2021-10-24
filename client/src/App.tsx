import "./App.css";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Root from "./pages/Root";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { RecoilRoot } from "recoil";
import Rooms from "./pages/Rooms";
import Bells from "./pages/Bells";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Root}></Route>
          <Route path="/signin" exact component={Signin}></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/rooms" exact component={Rooms}></Route>
          <Route path="/bells" exact component={Bells}></Route>
        </Switch>
      </div>
    </RecoilRoot>
  );
}

export default App;

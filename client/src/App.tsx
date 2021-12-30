import "./App.css";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Root from "./pages/Root";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useRecoilState } from "recoil";
import Rooms from "./pages/Rooms";
import Bells from "./pages/Bells";
import { pathToFileURL } from "url";
import { Alarm, alarmModalState } from "./state";
import AlarmModal from "./components/AlarmModal";
import MyPage from "./pages/MyPage";
import MessageModal from "./components/MessageModal";
import Community from "./pages/Community";

function App() {
  const [alarmModals, setAlarmModal] = useRecoilState<Alarm[]>(alarmModalState);

  return (
    <div className="App">
      {alarmModals?.map((alarm, idx) => (
        <AlarmModal key={idx} alarm={alarm} idx={idx} />
      ))}
      {/* <MessageModal /> */}
      <Switch>
        <Route path="/" exact component={Root}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/rooms" exact component={Rooms}></Route>
        <Route path="/bells" exact component={Bells}></Route>
        <Route path="/mypage" exact component={MyPage}></Route>
        <Route path="/community/all" exact component={Community}></Route>
      </Switch>
    </div>
  );
}

export default App;

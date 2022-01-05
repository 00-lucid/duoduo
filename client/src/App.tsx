import "./App.css";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Root from "./pages/Root";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useRecoilState, useSetRecoilState } from "recoil";
import Rooms from "./pages/Rooms";
import Bells from "./pages/Bells";
import { pathToFileURL } from "url";
import { Alarm, alarmModalState, socketState } from "./state";
import AlarmModal from "./components/AlarmModal";
import MyPage from "./pages/MyPage";
import MessageModal from "./components/MessageModal";
import Community from "./pages/Community";
import PostComment from "./pages/PostComment";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
let socket;

function App() {
  const [alarmModals, setAlarmModal] = useRecoilState<Alarm[]>(alarmModalState);
  const [isMessage, setIsMessage] = useState(false);
  const setSocket = useSetRecoilState(socketState);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_SERVER_URL}`);
    setSocket(socket);
  });

  return (
    <div className="App">
      {alarmModals?.map((alarm, idx) => (
        <AlarmModal key={idx} alarm={alarm} idx={idx} />
      ))}

      {isMessage ? (
        <MessageModal setIsMessage={setIsMessage} />
      ) : (
        <div className="fixed bg-white w-1/4 right-0 bottom-0 border z-40 flex flex-col rounded-t-lg overflow-hidden mr-4 shadow-2xl z-40">
          {/* 노티시에는 노란색 */}
          <button
            className="bg-green-400 h-10"
            onClick={() => setIsMessage(true)}
          ></button>
        </div>
      )}
      <Switch>
        <Route path="/" exact component={Root}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/rooms" exact component={Rooms}></Route>
        <Route path="/bells" exact component={Bells}></Route>
        <Route path="/mypage" exact component={MyPage}></Route>
        <Route path="/community/all" exact component={Community}></Route>
        <Route path="/community/free" exact component={PostComment}></Route>
      </Switch>
    </div>
  );
}

export default App;

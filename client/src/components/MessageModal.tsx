import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../state-persist";
import { getToken } from "../common/auth";
import { socketState } from "../state";
import Chat from "./Chat";

function MessageModal({ setIsMessage, socket }: any) {
  const [isMode, setIsMode] = useState<string>("none");

  const [text, setText] = useState("");
  const userInfo = useRecoilValue(userInfoState);
  const isLogin = getToken().token ? true : false;
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", ({ from, message }: any) => {
      console.log(`${from}님의 메시지 "${message}"`);
      setChats((old) => [...old, { text: `${from}: ${message}` }]);
    });
  }, []);

  const submitMessage = () => {
    if (text) {
      socket.emit("send message", {
        message: text,
        from: userInfo.nickname,
      });
      setText("");
    }
  };

  return (
    <>
      <div className="fixed bg-white w-1/4 right-0 bottom-0 border h-96 flex flex-col rounded-t-lg overflow-hidden mr-4 shadow-2xl z-40">
        <button
          className="bg-green-400 h-10"
          onClick={() => setIsMessage(false)}
        ></button>
        <ul className="flex flex-col p-4 overflow-y-scroll w-full flex-1 text-left">
          {isLogin ? (
            isMode === "none" ? (
              <p className="text-gray-400">매칭된 유저가 없습니다 :D</p>
            ) : isMode == "loading" ? (
              <p className="text-gray-400">상대를 기다리는 중입니다...</p>
            ) : (
              chats.map((el: any) => <Chat text={el.text} />)
            )
          ) : (
            <p className="text-gray-400">로그인이 필요한 서비스입니다</p>
          )}
        </ul>
        <section className="border-t h-10 flex flex-row">
          <Input
            type="text"
            className="flex-1"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></Input>
          <button
            className="bg-green-400 w-1/6 text-white"
            onClick={submitMessage}
          >
            전송
          </button>
        </section>
      </div>
    </>
  );
}

export default MessageModal;

const Input = styled.input({
  outline: "none",
  color: "#343a40",
  backgroundColor: "#e9ecef",
  fontSize: "1.1rem",
  padding: "0.9rem",
});

import styled from "styled-components";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../state-persist";

const socket = io("http://localhost:5000");

function MessageModal() {
  const [text, setText] = useState("");
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    socket.on("receive message", ({ nickname, message }) => {
      console.log("on receive");
      console.log(`${nickname} ${message}`);
    });
  });

  const submitMessage = () => {
    socket.emit("send message", {
      nickname: userInfo.nickname,
      message: text,
      target: null,
    });
    setText("");
  };

  return (
    <>
      <div className="fixed bg-white w-1/4 right-0 bottom-0 border h-96 z-20 flex flex-col rounded-t-lg overflow-hidden mr-4">
        {/* 노티시에는 노란색 */}
        <button className="bg-green-400 h-10"></button>
        <section className="flex-1 flex flex-row">
          <ul className="w-1/4 border-r p-2">
            <li className="cursor-pointer">nsky</li>
            <li className="cursor-pointer text-gray-300">test</li>
          </ul>
          <ul className="flex flex-col items-start p-2">
            <li>상대: 안녕하세요</li>
            <li>나: 안녕하세요</li>
          </ul>
          <div className="flex-1"></div>
        </section>
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

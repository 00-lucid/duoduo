import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../state-persist";
import { getToken } from "../common/auth";
import { socketState } from "../state";

function MessageModal({ setIsMessage }: any) {
  const socket = useRecoilValue(socketState);
  const [text, setText] = useState("");
  const userInfo = useRecoilValue(userInfoState);
  const isLogin = getToken().token ? true : false;

  useEffect(() => {
    socket.on("receive message", ({ from, message }: any) => {
      console.log(`${from}님의 메시지 "${message}"`);
    });
    // socket.on("receive notice", (notice) => {
    //   console.log(notice);
    // });
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
        <ul className="flex flex-col items-start p-4 overflow-y-scroll w-full flex-1 justify-center items-center">
          {isLogin ? (
            <p className="text-gray-400">매칭된 유저가 없습니다 :D</p>
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

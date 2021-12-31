import axios from "axios";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../state-persist";
import PostBtn from "./PostBtn";

function PostWrite({ setIsWrite, setPosts }: any) {
  const [textTitle, setTextTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const { nickname } = useRecoilValue(userInfoState);

  const clickLike = () => {
    console.log("like");
  };

  const clickComment = () => {
    console.log("comment");
  };

  const title: any = useRef();
  const body: any = useRef();

  const validationTitle = () => {
    let numberOfText = title.current.value.length;
    const maxOfText = 10;
    if (numberOfText > maxOfText) {
      title.current.value = title.current.value.slice(0, 10);
    }
  };
  const validationBody = (e: any) => {
    let numberOfText = body.current.value.length;
    const maxOfText = 130;
    if (numberOfText > maxOfText) {
      body.current.value = body.current.value.slice(0, 130);
    }
  };

  const addPost = async () => {
    const obj = {
      title: textTitle,
      body: textBody,
      nickname: nickname,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/community`,
      obj
    );

    if (!data) {
      setPosts((old: any) => {
        const arr = old.shift();
        return arr;
      });
      alert("오류입니다 다시 시도해주세요");
      setIsWrite(true);
      return;
    }
    setPosts((old: any) => [data, ...old]);
    setIsWrite(false);
  };
  return (
    <>
      <section className="flex flex-col shadow-sm h-48 p-4 mb-2 bg-white border border-green-400 shadow-sm">
        <section className="flex font-bold text-sm text-gray-400 justify-between items-center">
          <input
            type="text"
            placeholder="제목"
            className="text-sm font-bold text-gray-400"
            ref={title}
            onKeyDown={validationTitle}
            onChange={(e: any) => setTextTitle(e.target.value)}
          ></input>
          <p
            className="pt-1 pb-1 pl-2 pr-2 text-white rounded"
            style={{
              backgroundColor: "#333D4B",
            }}
          >
            자유
          </p>
        </section>
        <section className="flex flex-start font-semibold text-lg flex-1">
          <textarea
            className="w-full h-full text-lg font-semibold"
            style={{
              color: "#333d4b",
            }}
            onKeyDown={validationBody}
            onChange={(e: any) => setTextBody(e.target.value)}
            placeholder="본문"
            ref={body}
          ></textarea>
        </section>
        <section className="flex justify-between items-center flex text-sm text-gray-400 font-bold">
          <section className="flex flex-1">
            {/* icon is freepik */}
            <section onClick={clickLike} className="cursor-pointer mr-6">
              <button
                className="w-full h-full bg-green-400 pt-1 pb-1 pl-2 pr-2 text-white rounded"
                onClick={addPost}
              >
                완료
              </button>
            </section>
          </section>
          <section className="flex flex-row items-center justify-between w-32 text-xs">
            {/* <p>지금</p>
            <p>이름</p> */}
          </section>
        </section>
      </section>
    </>
  );
}

export default PostWrite;
